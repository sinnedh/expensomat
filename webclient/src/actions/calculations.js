export const getCalculation = (token) => {
  return {type: 'CALCULATION:LOAD_REQUEST', token}
}

export const createCalculation = (calculation) => {
  return {type: 'CALCULATION:CREATE_REQUEST', calculation}
}

export const deleteCalculation = (token, calculation) => {
  return {type: 'CALCULATION:DELETE_REQUEST', token, calculation}
}

export const updateCalculation = (token, changes) => {
  return {type: 'CALCULATION:UPDATE_REQUEST', token, changes}
}

export const updateMember = (token, members, member, changes) => {
  const updatedMembers = members.map( (item, index) => {
        if(item.id !== member.id) {
            return item;
        }
        return {...item, ...changes}
    })
  return {type: 'CALCULATION:UPDATE_REQUEST', token, changes: { members: updatedMembers }}
}
