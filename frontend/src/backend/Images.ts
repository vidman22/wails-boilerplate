import { gql } from '@apollo/client';

export const CREATE_IMAGE = gql`
    mutation CreateImage($object: images_insert_input!, $onConflict: images_on_conflict){
        image: insert_images_one(object: $object, on_conflict: $onConflict){
            id
        }
    }
`;

export const IMAGE_FRAGMENT = gql`
    fragment ImageFields on images {
        id
        __typename
        imageUrl
        photographerName
        photographerUrl
        height
        width
        synset
    }
`;

export const GET_IMAGES = gql`
    ${IMAGE_FRAGMENT}
    query GetImages($where: images_bool_exp!, $limit: Int, $offset: Int) {
        images(where: $where, limit: $limit, offset: $offset) {
            ...ImageFields
        }
    }
`;
