# Useful database queries

These can be executed locally through `bin/dev-psql`

## Question revision lifecycle stages

Shows question revisions and their lifecycle. The `distinct` usages will hide all other obsolete revisions of which there can be many.

```
SELECT distinct questions.id AS  question_id, questions.name, versions.lifecycle_stage
FROM questions
LEFT JOIN versions_questions ON (questions.id = versions_questions.questions_id)
LEFT JOIN versions ON versions.id = versions_questions.versions_id 
ORDER BY questions.name, questions.id desc;
```

Sample output:

```
question_id |        name         | lifecycle_stage 
-------------+---------------------+-----------------
           2 | Income Verification | draft
           1 | Income Verification | active
           1 | Income Verification | obsolete
           5 | test enum           | draft
           3 | test enum           | active
           3 | test enum           | obsolete
```

## Program revision lifecycle stages

Similar to above but excludes obsolete as there can be many over time.

```
SELECT DISTINCT programs.id, programs.name, programs.create_time, versions.lifecycle_stage
FROM programs
LEFT JOIN versions_programs ON (programs.id = versions_programs.programs_id)
LEFT JOIN versions on versions.id = versions_programs.versions_id
WHERE lifecycle_stage != 'obsolete'
ORDER BY name, id desc;
```

Sample output:

```
 id |     name     |       create_time       | lifecycle_stage 
----+--------------+-------------------------+-----------------
  7 | test program | 2022-04-26 14:25:27.125 | active
  8 | v37 program  | 2022-04-26 14:38:35.596 | draft
  6 | v37 program  | 2022-04-25 15:18:19.592 | active
```
