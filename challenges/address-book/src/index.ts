type Address = {
  street?: string
  city?: string
  state?: string
  postalCode?: number
  country?: string
  houseNumber?: number
}

type Contact = {
  firstName?: string
  middleName?: string
  lastName?: string
  email?: string
  phones: { [id: string]: string }
  addresses: { [addrName: string]: Address }
  salutation?: string
}

export class AddressBook {
  contacts: Contact[] = []

  addContact(contact: Contact) {
    this.contacts.push(contact)
  }

  findContactByName(inputContact: Contact) {
    return this.contacts.filter((c) => {
      if (
        typeof inputContact.firstName !== 'undefined' &&
        c.firstName !== inputContact.firstName
      ) {
        return false
      }
      if (
        typeof inputContact.lastName !== 'undefined' &&
        c.lastName !== inputContact.lastName
      ) {
        return false
      }
      return true
    })
  }
}

export function formatDate(date: Date) {
  return date.toISOString().replace(/[-:]+/g, '').split('.')[0] + 'Z'
}

function getFullName(contact: Contact) {
  return [contact.firstName, contact.middleName, contact.lastName]
    .filter(Boolean)
    .join(' ')
}

export function getVcardText(contact: Contact, date = new Date()) {
  const parts = [
    'BEGIN:VCARD',
    'VERSION:2.1',
    `N:${contact.lastName};${contact.firstName};${contact.middleName || ''};${
      contact.salutation || ''
    }`,
    `FN:${getFullName(contact)}`,
    ...Object.keys(contact.phones).map(
      (phName) => `TEL;${phName.toUpperCase()};VOICE:${contact.phones[phName]}`
    ),
    ...Object.keys(contact.addresses)
      .map((addrName) => {
        const address = contact.addresses[addrName]
        if (address) {
          return `ADR;${addrName.toUpperCase()}:;;${address.houseNumber} ${
            address.street
          };${address.city};${address.state};${address.postalCode};${
            address.country
          }\nLABEL;${addrName.toUpperCase()};ENCODING=QUOTED-PRINTABLE;CHARSET=UTF-8:${
            address.houseNumber
          } ${address.street}.=0D=0A=${address.city}, ${address.state} ${
            address.postalCode
          }=0D=0A${address.country}`
        } else {
          return ''
        }
      })
      .filter(Boolean),
  ]

  if (contact.email) {
    parts.push(`EMAIL:${contact.email}`)
  }
  const d = new Date()
  parts.push(`REV:${formatDate(date)}`)
  parts.push('END:VCARD')
  return parts.join('\n')
}
