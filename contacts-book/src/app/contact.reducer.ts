import * as ContactActions from "./contact.action";
import { SimplifiedContact } from "./contact";

export const initialState: { [ssn: string]: SimplifiedContact } = {
  56360: {
    address: "Guadeloupe",
    description: "Molestias eligendi qui placeat dolorem quis consequuntur qui deserunt. Hic quo non unde sit est. Quas explicabo quis odit aut.",
    email: "Jimmy@Quigley.com",
    firstName: "Jimmy",
    lastName: "Quigley",
    phone: 90851,
    ssn: 56360
  } as SimplifiedContact,
  98271: {
    address: "China",
    description: "Dolores qui quis adipisci rerum aut consequuntur repellat. Veritatis consequatur est deleniti illum error doloribus et. Enim saepe perferendis non quasi esse. Hic est repudiandae asperiores temporibus error mollitia fugit praesentium. Adipisci quo dolorem enim maiores et repellat dicta. Necessitatibus qui qui dolore at dolorem exercitationem neque ducimus labore.",
    email: "Jaime@Huels.com",
    firstName: "Jaime",
    lastName: "Huels",
    phone: 71076,
    ssn: 98271,
  } as SimplifiedContact,
  66989: {
    address: "Wallis and Futuna",
    description: "Iusto quia consequatur laborum laboriosam sunt vitae veritatis. Ex magnam culpa sapiente molestiae laboriosam aliquam consequuntur aliquam dolor. Doloremque perferendis alias vitae accusamus soluta et non suscipit. Ex quis accusantium pariatur quo dolor iure quia.",
    email: "Omer@Dickens.com",
    firstName: "Omer",
    lastName: "Dickens",
    phone: 67376,
    ssn: 66989,
  } as SimplifiedContact,
  90044: {
    address: "Kenya",
    description: "Magnam necessitatibus fugiat cumque officia sint dignissimos molestiae reiciendis. Qui placeat eos laudantium rem qui minima. Et et quasi inventore nobis maxime sequi nisi ex.",
    email: "Roma@Hermann.com",
    firstName: "Roma",
    lastName: "Hermann",
    phone: 7053,
    ssn: 90044,
  } as SimplifiedContact,
  53332: {
    address: "Belize",
    description: "Dolor maiores porro beatae. Officia vero magni alias iure esse dolore aut. Omnis optio dolore sit fugit assumenda. Nulla voluptatem quibusdam nulla soluta adipisci suscipit ad doloremque. Voluptas ipsum est tenetur tenetur iusto dolor. Et et reprehenderit dolorum quo.",
    email: "Lou@Carroll.com",
    firstName: "Lou",
    lastName: "Carroll",
    phone: 86557,
    ssn: 53332,
  } as SimplifiedContact,
  91094: {
    address: "Botswana",
    description: "Ut debitis ex fugit autem. Occaecati omnis placeat. Eos ipsa nam omnis qui officia hic et sunt nam.",
    email: "Mertie@Stiedemann.com",
    firstName: "Mertie",
    lastName: "Stiedemann",
    phone: 80774,
    ssn: 91094,
  } as SimplifiedContact,
};

export function ContactReducer(state: { [ssn: string]: SimplifiedContact } = initialState, action: ContactActions.Actions) {

  switch (action.type) {
    case ContactActions.ADD_CONTACT:
      return {...state, [action.payload.ssn]: action.payload};
    case ContactActions.ADD_CONTACT_ARRAY:
      let tmpContacts = {...state};

      action.payload.forEach(contact => {
        tmpContacts[contact.ssn] = contact;
      });

      return tmpContacts;
    default:
      return state;
  }
}
