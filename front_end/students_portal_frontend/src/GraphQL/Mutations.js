import { gql } from "@apollo/client";

export const CREATE_PROFILE  = gql`
  mutation($profile : String)
  {
    createProfile(profile : $profile) {
      id
      registrationNumber
      type
      profile {
        refId
        email
        userName
      }
    }
  }
`;

export const POST_MESSAGE  = gql`
mutation($messageDto: MessageBody, $profileType : String){
  postMessage(messageDto: $messageDto, profileType : $profileType){
    id
    lecturer{
     profile {
         refId
         email
         userName
       }
       registrationNumber
     }
    student{
       profile {
         refId
         email
         userName
       }
       registrationNumber
     }
    spaceItems{
     id
     type
     message
     notified
     topics
     profile {
         refId
         email
         userName
       }
     timeSent
     timeRead
     spaceRefId
     from {
         refId
         email
         userName
       }
     to {
         refId
         email
         userName
       }
     title
     time
     meetingType
     description
   }
  }
}
`
