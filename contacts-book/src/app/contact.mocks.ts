import mocker from "mocker-data-generator";

const contact = {
  firstName: {
    faker: 'name.firstName'
  },
  lastName: {
    faker: 'name.lastName'
  },
  ssn: {
    incrementalId: true,
  },

  address: {
    faker: 'address.country'
  },
  description: {
    faker: 'lorem.paragraph'
  },
  email: {
    function: function() {
      return this.object.firstName + '@' + this.object.lastName + '.com';
    }
  },
  phone: {
    faker: 'random.number'
  }
}

export async function mockContactFactory(number: number): Promise<any>  {
  return mocker()
    .schema('contacts', contact, number)
    .build();
}
