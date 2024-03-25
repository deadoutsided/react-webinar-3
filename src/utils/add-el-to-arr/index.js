export function addElToCommentsArr(id, arr){
  if(id === ''){
    return [...arr, 'form']
  }
  const index = arr.findIndex((el) => el._id === id);
  arr.splice(index+1, 0, 'form');
  return arr;
}
