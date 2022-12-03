import { gql } from "@apollo/client";

const getStudentQuery = gql`
  {
    students {
      id
      profile {
        id
        refId
        email
        userName
      }
      registrationNumber
    }
  }
`;
const getLecturerQuery = gql`
  {
    lecturers {
      id
      profile {
        id
        refId
        email
        userName
      }
      registrationNumber
    }
  }
`;


const getActiveProfiles = gql`
  query($type : String)
  {
    getActiveProfiles(type: $type) {
      id
      type
      profile {
        id
        refId
        email
        userName
      }
      registrationNumber
    }
  }
`;


const getActiveProfile = gql`
  query
  {
    getActiveProfile {
      id
      type
      profile {
        refId
        email
        userName
      }
      registrationNumber
    }
  }
`;

const getProfileByUser = gql`
  query($refId : String)
  {
    getProfileByRefId(refId: $refId) {
      id
      type
      profile {
        refId
        email
        userName
      }
      registrationNumber
    }
  }
`;


const LOAD_STUDENTS = gql`
  query {
    students {
      id
      profile {
        id
        refId
        email
        userName
      }
      registrationNumber
    }
  }
`;

const LOAD_LECTURER = gql`
  query {
    lecturer {
      id
      profile {
        id
        refId
        email
        userName
      }
      registrationNumber
    }
  }
`;

const PROFILE_HIGHLIGHT = gql`
  query($profile : String)
    {
      profileHighlights (profile : $profile) {
        recentlyContacted {
          id
          title
          lecturer{
            registrationNumber
            profile{
              userName
              refId
            }
          }
          student{
            registrationNumber
            profile{
              userName
              refId
            }
          }
        }
        frequentlyContacted{
          id
          title
          lecturer{
            registrationNumber
            profile{
              userName
              refId
            }
          }
          student{
            registrationNumber
            profile{
              userName
              refId
            }
          }
        }        
      }
    }
`;


const NOTIFICATIONS = gql`
  query
    {
      getNotifications {
          id
          url
          to
          description
          createdAt
          markedRead
      }
    }
`;


const GET_MEETINGS = gql`
  query($refId : String)
    {
      getMeetings (refId : $refId) {
          id
          meetingType
          description
          time
        
      }
    }
`;


const SEARCH_PROFILES = gql`
query($profile : String, $name:String)
{
  searchProfiles(profile : $profile, name : $name) {
     id
      type
      profile {
        refId
        email
        userName
      }
      registrationNumber
  }
}
`;


const GET_USER_CHAT_SPACE = gql`
query($profile : String, $refId:String)
{
  getDetailedChatSpace(profile : $profile, refId : $refId) {
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
     link
     meetingType
     description
   }
 }
}
`;


export{
  getStudentQuery,
  getLecturerQuery,
  getActiveProfile,
  LOAD_STUDENTS,
  LOAD_LECTURER,
  PROFILE_HIGHLIGHT,
  SEARCH_PROFILES,
  GET_USER_CHAT_SPACE,
  getProfileByUser,
  GET_MEETINGS,
  NOTIFICATIONS
}