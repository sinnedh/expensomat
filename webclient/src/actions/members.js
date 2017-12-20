export const getMembers = (token) => {
  return {type: 'MEMBERS:LOAD_REQUEST', token}
}

export const createMember = (token, member) => {
  return {type: 'MEMBERS:CREATE_REQUEST', token, member}
}

export const deleteMember = (token, member) => {
  return {type: 'MEMBERS:DELETE_REQUEST', token, member}
}

export const updateMember = (token, id, changes) => {
  return {type: 'MEMBERS:UPDATE_REQUEST', token, id, changes}
}
