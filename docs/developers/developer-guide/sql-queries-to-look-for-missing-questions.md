# SQL queries to look for missing questions

### Check Questions For Missing Enumerators

This query checks if active version questions are bound to enumerators that are missing. The `is_enumerator_missing` column will be `true` if the enumerator does not exist in the questions table.

```sql
select
    v.id as versions_id,
    v.lifecycle_stage as versions_lifecycle_stage,
    q.id as questions_id,
    q.name as question_name,
    q.question_type,
    q.enumerator_id,
    case when eq.id is null then true else false end as is_enumerator_missing
from questions as q
inner join versions_questions as vq
    on vq.questions_id = q.id
inner join versions as v
    on vq.versions_id = v.id
left join questions as eq
    on q.enumerator_id = eq.id
where q.enumerator_id is not null
and eq.id is null
and v.lifecycle_stage = 'active'
order by v.id desc
```

### Check Programs for Missing Questions

This query flattens out the program block\_definitions json. The `debug_notes` column will provide a message describing problems that were found.

The query `debug_notes` currently checks if

* questionDefinition points to a question that doesn't exist
* questionDefinition enumerator points to a question that doesn't exist
* hidePredicate points to a question that doesn't exist

```sql
with program_definitions as
(
    select
        v.id as versions_id,
        v.lifecycle_stage as versions_lifecycle_stage,
        p.id as programs_id, 
        p.name as programs_name,
        cast(jsonb_array_elements(p.block_definitions)->>'id' as bigint) as block_definitions_id,
        jsonb_array_elements(p.block_definitions)->>'name' as block_definitions_name,
        cast(jsonb_array_elements(p.block_definitions)->>'repeaterId' as bigint) as block_definitions_repeaterId,
        cast(jsonb_array_elements(p.block_definitions)->'hidePredicate'->'rootNode'->'node'->'questionId' as bigint) as hidePredicate_questionId,
        cast(jsonb_array_elements(jsonb_array_elements(p.block_definitions)->'questionDefinitions')->>'id' as bigint) as questionDefinitions_id,
        cast(jsonb_array_elements(jsonb_array_elements(p.block_definitions)->'questionDefinitions')->>'optional' as bool) as questionDefinitions_optional
        --jsonb_array_elements(p.block_definitions)->'optionalPredicate' as optionalPredicate,
    from programs as p
    inner join versions_programs as vp
        on p.id = vp.programs_id
    inner join versions as v
        on v.id = vp.versions_id
),
program_questions_expanded as
(
    select 
        pd.versions_id, 
        pd.versions_lifecycle_stage,
        pd.programs_id, 
        pd.programs_name, 
    
        -- Block Definition Questions
        pd.block_definitions_id, 
        pd.block_definitions_name, 
        pd.block_definitions_repeaterId, 
        pd.questionDefinitions_id, 
        pd.questionDefinitions_optional,
        qd.id as questions_id, 
        qd.name as questions_name, 
        qd.question_type, 
        case when pd.questionDefinitions_id is not null and qd.id is null 
            then concat('No question found for id "', pd.questionDefinitions_id, '". ') 
            else null 
        end as questionDefinitions_debug_notes,
    
        -- Enumerator
        qd.enumerator_id,
        qe.name as enumerator_questions_name,
        case when qd.enumerator_id is not null and qe.id is null 
            then concat('No question found for enumerator id "', qd.enumerator_id, '". ') 
            else null 
        end as questionDefinitions_enumerator_debug_notes,
    
        -- HidePredicate
        pd.hidePredicate_questionId, 
        qh.name as hidePredicate_name,
        qh.question_type as hidePredicate_question_type,
        case when pd.hidePredicate_questionId is not null and qh.id is null 
            then concat('No question found for hidePredicate question id "', pd.hidePredicate_questionId, '". ') 
            else null 
        end as hidePredicate_debug_notes
    from program_definitions as pd
    left join questions as qd
        on qd.id = pd.questiondefinitions_id
    left join questions as qe
        on qe.id = qd.enumerator_id
    left join questions as qh
       on qh.id = pd.hidepredicate_questionid
)

select
    versions_id, 
    versions_lifecycle_stage,
    programs_id, 
    programs_name, 
    block_definitions_id, 
    block_definitions_name, 
    block_definitions_repeaterId, 
    questionDefinitions_id, 
    questionDefinitions_optional,
    questions_id, 
    questions_name, 
    question_type, 
    enumerator_id,
    enumerator_questions_name,
    hidePredicate_questionId,
    hidePredicate_name,
    hidePredicate_question_type,
    nullif(concat(
        questionDefinitions_debug_notes,
        questionDefinitions_enumerator_debug_notes,
        hidePredicate_debug_notes
    ), '')  as debug_notes
from program_questions_expanded    
where versions_lifecycle_stage = 'active'
--and programs_name = 'Utility Discount Program - Extended'
order by versions_id desc, programs_name, block_definitions_id
```
