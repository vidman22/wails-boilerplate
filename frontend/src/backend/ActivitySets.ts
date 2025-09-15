import { gql } from '@apollo/client';
import { IMAGE_FRAGMENT } from '@/backend/Images';



export const LISTENING_FRAGMENT_ON_ACTIVITY = gql`
    fragment ListeningFieldsOnActivity on listenings {
        __typename
        id
        instructions
        audioKey
        videoKey
        transcriptKey
    }
`;

export const READING_FRAGMENT_ON_ACTIVITY = gql`
    fragment ReadingFieldsOnActivity on readings {
        __typename
        id
        contentKey
        updatedAt
        translationKey
    }
`;

export const VOCABULARY_WORD_FRAGMENT_ON_ACTIVITY = gql`
    ${IMAGE_FRAGMENT}
    fragment VocabularyWordFieldsOnActivity on vocabulary_words {
        __typename
        id
        word
        vocabularySetId
        example
        exampleTranslation
        wordLanguage
        examplePronunciation
        definitionLanguage
        order
        definitionPronunciation
        pos
        pronunciation
        definition
		imageId
        image{
            ...ImageFields
        }
    }
`;


export const VOCABULARY_FRAGMENT_ON_ACTIVITY = gql`
    ${VOCABULARY_WORD_FRAGMENT_ON_ACTIVITY}
    fragment VocabularyFieldsOnActivity on vocabulary_sets {
        __typename
        id
        vocabularyWords{
            ...VocabularyWordFieldsOnActivity
        }
        createdAt
        updatedAt
        activitySetId
        activitySet{
            __typename
            id
            title
            description
            subjectId
        }
    }
`;

export const FITB_FRAGMENT_ON_ACTIVITY = gql`
    fragment FitbFieldsOnActivity on fill_in_the_blanks {
        id
        __typename
        order
        baseSentence
        hint
        translation
        explanation
        omission
        audioUrl
        options{
          id
          option
        }
    }
`;

export const MATCHING_FRAGMENT_ON_ACTIVITY = gql`
    fragment MatchingFieldsOnActivity on matchings {
      id
      __typename
      order
      matchingOptions{
        id
        __typename
        firstColumn
        secondColumn
      }
    }
`;

export const MULTIPLE_CHOICE_FRAGMENT_ON_ACTIVITY = gql`
    ${IMAGE_FRAGMENT}
    fragment MultipleChoiceFieldsOnActivity on multiple_choices {
      id
      __typename
      order
      imageId
      image{
        ...ImageFields
      }
      isMultiSelect
      prompt
      explanation
      audioUrl
      multipleChoiceOptions{
        id
        isCorrectAnswer
        option
      }
    }
`;

export const ANAGRAM_FRAGMENT_ON_ACTIVITY = gql`
    ${IMAGE_FRAGMENT}
    fragment AnagramFieldsOnActivity on anagrams {
      id
      __typename
      order
      imageId
      image{
        ...ImageFields
      }
      audio
      word
    }
`;

export const PHRASE_FRAGMENT_ON_ACTIVITY = gql`
    fragment PhraseFieldsOnActivity on phrases {
      id
      __typename
      order
      phrase
      translation
      pronunciation
      isPronunciation
    }
`;
export const OPEN_ANSWERS_FRAGMENT_ON_ACTIVITY = gql`
    fragment OpenAnswerFieldsOnActivity on open_answers {
      id
      __typename
      order
      isSpellcheckEnabled
      prompt
      wordLimit
    }
`;

export const ACTIVITY_BASIC_INFO_FRAGMENT = gql`
    fragment ActivitySetBasicInfoFields on activity_sets{
        id
        __typename
        title
        forkedFrom
        learnerLanguage
        description
        level
        imageId
        image{
            ...ImageFields
        }
        subjectId
        subject{
            id
            language{
                id 
                key
            }
        }
        isPrivate
        createdBy
        createdAt
        deletedAt
        user{
            id
            firstName
            image
        }
    }
`;

export const ACTIVITY_FRAGMENT = gql`
    ${FITB_FRAGMENT_ON_ACTIVITY}
    ${LISTENING_FRAGMENT_ON_ACTIVITY}
    ${READING_FRAGMENT_ON_ACTIVITY}
    ${VOCABULARY_FRAGMENT_ON_ACTIVITY}
    ${MATCHING_FRAGMENT_ON_ACTIVITY}
    ${MULTIPLE_CHOICE_FRAGMENT_ON_ACTIVITY}
    ${ANAGRAM_FRAGMENT_ON_ACTIVITY}
    ${PHRASE_FRAGMENT_ON_ACTIVITY}
    ${OPEN_ANSWERS_FRAGMENT_ON_ACTIVITY}
    ${IMAGE_FRAGMENT}
    ${ACTIVITY_BASIC_INFO_FRAGMENT}
    fragment ActivitySetFields on activity_sets{
    ...ActivitySetBasicInfoFields
    readingId
    reading{
        ...ReadingFieldsOnActivity
    }
    listeningId
    listening{
        ...ListeningFieldsOnActivity
    }
    vocabularyId
    vocabularySet{
        ...VocabularyFieldsOnActivity
    }
    anagrams{
        ...AnagramFieldsOnActivity
    }
    phrases{
        ...PhraseFieldsOnActivity
    }
    matchings{
        ...MatchingFieldsOnActivity
    }
    fillInTheBlanks{
        ...FitbFieldsOnActivity
    }
    multipleChoices{
        ...MultipleChoiceFieldsOnActivity
    }
    openAnswers{
        ...OpenAnswerFieldsOnActivity
    }
  }
`;

const ACTIVITY_SEARCH_RESULT = gql`
    ${IMAGE_FRAGMENT}
    fragment ActivitySearchFields on activity_sets {
        id
        __typename
        readingId
        vocabularyId
        listeningId
        createdAt
        subjectId
        isPrivate
        description
        title
        level
        imageId
        image{
            ...ImageFields
        }
  	    anAgg: anagrams_aggregate{
          aggregate{
            count
          }
        }
        fitbAgg: fillInTheBlanks_aggregate{
          aggregate{
            count
          }
        }
        oaAgg: openAnswers_aggregate{
          aggregate{
            count
          }
        }
        matchAgg: matchings_aggregate{
          aggregate{
            count
          }
        }
        mcAgg: multipleChoices_aggregate{
          aggregate{
            count
          }
        }
    }
`;

export const GET_ACTIVITY_SET_READING_ID = gql`
    query GetActivitySetReadingId($id: Int!){
        activitySet: activity_sets_by_pk(id: $id){
            id
            title
            readingId
            listeningId
            listening{
                id
                audioKey
                transcriptKey
            }
        }
    }
`;


export const GET_ACTIVITY_SET_BASIC_INFO = gql`
    ${ACTIVITY_BASIC_INFO_FRAGMENT}
    query GetActivitySetBasicInfo($id: Int!){
        activitySet: activity_sets_by_pk(id: $id){
            ...ActivitySetBasicInfoFields
        }
    }
`;

export const GET_ACTIVITY_SETS = gql`
    ${ACTIVITY_FRAGMENT}
    query GetActivitySets($where: activity_sets_bool_exp, $orderBy: [activity_sets_order_by!], $limit: Int, $offset: Int ){
        activitySets: activity_sets(where: $where, limit: $limit, offset: $offset order_by: $orderBy){
            ...ActivitySetFields
        }
    }
`;

export const GET_ACTIVITY_SET_TITLES = gql`
    query GetActivitySetTitles($where: activity_sets_bool_exp) {
        activitySets: activity_sets(where: $where){
            id
            title
        }
    }
`;

export const GET_ACTIVITY_SETS_SEARCH = gql`
    ${ACTIVITY_SEARCH_RESULT}
    query GetActivitySetsSearch($where: activity_sets_bool_exp, $orderBy: [activity_sets_order_by!], $limit: Int, $offset: Int ){
        activitySets: activity_sets(where: $where, limit: $limit, offset: $offset order_by: $orderBy){
            ...ActivitySearchFields
        }
        agg: activity_sets_aggregate(where: $where){
            aggregate{
                count
            }
        }
    }
`;

export const GET_ACTIVITY_SET = gql`
    ${ACTIVITY_FRAGMENT}
    query GetActivitySetByPk($id: Int!){
        activitySet: activity_sets_by_pk(id: $id){
            ...ActivitySetFields
        }
    }
`;

export const ADD_ACTIVITY_SET = gql`
  mutation CreateActivitySet($object: activity_sets_insert_input!, $onConflict: activity_sets_on_conflict) {
    activitySet: insert_activity_sets_one(object: $object, on_conflict: $onConflict) {
        id
        vocabularyId
        readingId
        listeningId
        vocabularySet{
            id 
            __typename
            vocabularyWords{
                id
                __typename
                word
            }
        }
    }
  }
`;

export const ADD_ACTIVITY_SETS = gql`
  mutation CreateActivitySets($objects: [activity_sets_insert_input!]!, $onConflict: activity_sets_on_conflict) {
    activitySets: insert_activity_sets(objects: $objects, on_conflict: $onConflict) {
        returning{
            id
            __typename
            reading{
                __typename
                id
            }
        }
    }
  }
`;

export const DELETE_ACTIVITY_SET = gql`
  mutation DeleteActivitySet($id: Int!) {
    activitySet: delete_activity_sets_by_pk(id: $id) {
        id
    }
  }
`;

export const UPDATE_ACTIVITY_SET = gql`
  mutation UpdateActivitySet($pkColumns: activity_sets_pk_columns_input!, $set: activity_sets_set_input) {
    activitySet: update_activity_sets_by_pk(
        pk_columns: $pkColumns,
        _set: $set
    ) {
        id
    }
  }
`;
export const UPDATE_MANY_ACTIVITY_SET = gql`
  mutation UpdateManyActivitySets($updates: [activity_sets_updates!]!) {
    activitySets: update_activity_sets_many(
        updates: $updates,
    ) {
        returning{
            id
        }
    }
  }
`;
