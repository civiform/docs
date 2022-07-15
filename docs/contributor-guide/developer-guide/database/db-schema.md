# DB Schema

The database schema is derived by combining all of the [evolution SQL files](https://github.com/seattle-uat/civiform/tree/main/server/conf/evolutions/default) in sequential order. It's current state as of #40 follows.  This can be generated using `pg_dump -s postgres` and then `\d tableName` on the table of interest.

Each table is mapped to a [models/ class](https://github.com/seattle-uat/civiform/tree/main/server/app/models), and the classes contain more context.

```
                                         Table "public.accounts"
       Column        |        Type         | Collation | Nullable |               Default                
---------------------+---------------------+-----------+----------+--------------------------------------
 id                  | bigint              |           | not null | nextval('accounts_id_seq'::regclass)
 email_address       | character varying   |           |          | 
 member_of_group_id  | bigint              |           |          | 
 managed_by_group_id | bigint              |           |          | 
 admin_of            | character varying[] |           |          | 
 global_admin        | boolean             |           |          | false
 authority_id        | character varying   |           |          | 
Indexes:
    "accounts_pkey" PRIMARY KEY, btree (id)
    "accounts_authority_id_key" UNIQUE CONSTRAINT, btree (authority_id)
    "accounts_email_address_key" UNIQUE CONSTRAINT, btree (email_address)
    "idx_admin_of" gin (admin_of)
Foreign-key constraints:
    "fk_managed" FOREIGN KEY (managed_by_group_id) REFERENCES ti_organizations(id) ON DELETE SET NULL
    "fk_member" FOREIGN KEY (member_of_group_id) REFERENCES ti_organizations(id) ON DELETE SET NULL
Referenced by:
    TABLE "applicants" CONSTRAINT "applicants_account_id_fkey" FOREIGN KEY (account_id) REFERENCES accounts(id)

                                           Table "public.applicants"
      Column      |            Type             | Collation | Nullable |                Default
------------------+-----------------------------+-----------+----------+----------------------------------------
 id               | bigint                      |           | not null | nextval('applicants_id_seq'::regclass)
 preferred_locale | character varying           |           |          |
 object           | jsonb                       |           | not null |
 account_id       | bigint                      |           |          |
 when_created     | timestamp without time zone |           |          |
Indexes:
    "applicants_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "applicants_account_id_fkey" FOREIGN KEY (account_id) REFERENCES accounts(id)
Referenced by:
    TABLE "applications" CONSTRAINT "fk_applicant" FOREIGN KEY (applicant_id) REFERENCES applicants(id)

                                             Table "public.api_keys"
        Column        |            Type             | Collation | Nullable |               Default                
----------------------+-----------------------------+-----------+----------+--------------------------------------
 id                   | bigint                      |           | not null | nextval('api_keys_id_seq'::regclass)
 name                 | character varying           |           | not null | 
 create_time          | timestamp without time zone |           | not null | 
 update_time          | timestamp without time zone |           | not null | 
 created_by           | character varying           |           | not null | 
 retired_time         | timestamp without time zone |           |          | 
 retired_by           | character varying           |           |          | 
 key_id               | character varying           |           | not null | 
 salted_key_secret    | character varying           |           | not null | 
 subnet               | character varying           |           | not null | 
 expiration           | timestamp without time zone |           | not null | 
 call_count           | bigint                      |           | not null | 0
 last_call_ip_address | character varying           |           |          | 
 grants               | jsonb                       |           | not null | 
Indexes:
    "api_keys_pkey" PRIMARY KEY, btree (id)
    "api_key_ids" UNIQUE, btree (key_id)
    "api_keys_key_id_key" UNIQUE CONSTRAINT, btree (key_id)
    "api_keys_salted_key_secret_key" UNIQUE CONSTRAINT, btree (salted_key_secret)

                                           Table "public.applications"
      Column      |            Type             | Collation | Nullable |                 Default
------------------+-----------------------------+-----------+----------+------------------------------------------
 id               | bigint                      |           | not null | nextval('applications_id_seq'::regclass)
 applicant_id     | bigint                      |           |          |
 program_id       | bigint                      |           |          |
 object           | jsonb                       |           | not null |
 lifecycle_stage  | character varying           |           |          |
 submit_time      | timestamp without time zone |           |          |
 submitter_email  | character varying(255)      |           |          |
 create_time      | timestamp without time zone |           |          |
 preferred_locale | character varying           |           |          |
Indexes:
    "applications_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "fk_applicant" FOREIGN KEY (applicant_id) REFERENCES applicants(id)
    "fk_program" FOREIGN KEY (program_id) REFERENCES programs(id)

                                          Table "public.files"
       Column       |          Type          | Collation | Nullable |              Default              
--------------------+------------------------+-----------+----------+-----------------------------------
 id                 | bigint                 |           | not null | nextval('files_id_seq'::regclass)
 name               | character varying(255) |           |          | 
 original_file_name | character varying      |           |          | 
 acls               | jsonb                  |           |          | '{}'::jsonb
Indexes:
    "files_pkey" PRIMARY KEY, btree (id)
    "index_file_names" UNIQUE, btree (name)

                                                 Table "public.programs"
            Column            |            Type             | Collation | Nullable |               Default                
------------------------------+-----------------------------+-----------+----------+--------------------------------------
 id                           | bigint                      |           | not null | nextval('programs_id_seq'::regclass)
 name                         | character varying           |           |          | 
 description                  | character varying           |           |          | 
 block_definitions            | jsonb                       |           | not null | 
 export_definitions           | jsonb                       |           |          | 
 legacy_localized_name        | jsonb                       |           |          | 
 legacy_localized_description | jsonb                       |           |          | 
 slug                         | character varying           |           |          | 
 localized_name               | jsonb                       |           |          | 
 localized_description        | jsonb                       |           |          | 
 external_link                | character varying           |           |          | ''::character varying
 display_mode                 | character varying           |           | not null | 'PUBLIC'::character varying
 create_time                  | timestamp without time zone |           |          | 
 last_modified_time           | timestamp without time zone |           |          | 
 status_definitions           | jsonb                       |           |          | '{"statuses": []}'::jsonb
Indexes:
    "programs_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "applications" CONSTRAINT "fk_program" FOREIGN KEY (program_id) REFERENCES programs(id)
    
                                            Table "public.questions"
          Column           |        Type         | Collation | Nullable |                Default
---------------------------+---------------------+-----------+----------+---------------------------------------
 id                        | bigint              |           | not null | nextval('questions_id_seq'::regclass)
 name                      | character varying   |           |          |
 description               | character varying   |           |          |
 question_type             | character varying   |           |          |
 legacy_question_text      | jsonb               |           |          |
 legacy_question_help_text | jsonb               |           |          |
 validation_predicates     | jsonb               |           |          |
 legacy_question_options   | jsonb               |           |          |
 enumerator_id             | bigint              |           |          |
 question_options          | jsonb               |           |          |
 question_text             | jsonb               |           |          |
 question_help_text        | jsonb               |           |          |
 enumerator_entity_type    | jsonb               |           |          |
 question_tags             | character varying[] |           |          |
Indexes:
    "questions_pkey" PRIMARY KEY, btree (id)
    "idx_question_tags" gin (question_tags)
    "questions_by_name" btree (name)

                                    Table "public.ti_organizations"
   Column    |       Type        | Collation | Nullable |                   Default
-------------+-------------------+-----------+----------+----------------------------------------------
 id          | bigint            |           | not null | nextval('ti_organizations_id_seq'::regclass)
 name        | character varying |           | not null |
 description | character varying |           |          |
Indexes:
    "ti_organizations_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "accounts" CONSTRAINT "fk_managed" FOREIGN KEY (managed_by_group_id) REFERENCES ti_organizations(id) ON DELETE SET NULL
    TABLE "accounts" CONSTRAINT "fk_member" FOREIGN KEY (member_of_group_id) REFERENCES ti_organizations(id) ON DELETE SET NULL

                                                Table "public.versions"
          Column           |            Type             | Collation | Nullable |               Default
---------------------------+-----------------------------+-----------+----------+--------------------------------------
 id                        | bigint                      |           | not null | nextval('versions_id_seq'::regclass)
 lifecycle_stage           | character varying           |           | not null |
 submit_time               | timestamp without time zone |           |          |
 tombstoned_question_names | character varying[]         |           |          |
 tombstoned_program_names  | character varying[]         |           |          |
Indexes:
    "versions_pkey" PRIMARY KEY, btree (id)

           Table "public.versions_programs"
   Column    |  Type  | Collation | Nullable | Default
-------------+--------+-----------+----------+---------
 programs_id | bigint |           | not null |
 versions_id | bigint |           | not null |
Indexes:
    "versions_programs_pkey" PRIMARY KEY, btree (programs_id, versions_id)

           Table "public.versions_questions"
    Column    |  Type  | Collation | Nullable | Default
--------------+--------+-----------+----------+---------
 questions_id | bigint |           | not null |
 versions_id  | bigint |           | not null |
Indexes:
    "versions_questions_pkey" PRIMARY KEY, btree (questions_id, versions_id)
```
