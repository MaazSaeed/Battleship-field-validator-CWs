function validateBattlefield(field)
{
  let visited = new Set();
  let battleships = 0, cruisers = 0, destroyers = 0, submarines = 0;
  for(let r = 0; r < 10; ++r)
    for(let c = 0; c < 10; ++c)
    {
      let sz = {siz : 0};
      let size = validateSizeOrientation(field, visited, r, c, sz);
      
      if(!size)
        return false;
      
      if(sz.siz == 4)
        battleships++;
      if(sz.siz == 3)
        cruisers++;
      if(sz.siz == 2)
        destroyers++;
      if(sz.siz == 1)
        submarines++;
      
      if(sz.siz > 4)
        return false;
      
      if(battleships > 1 || cruisers > 2 || destroyers > 3 || submarines > 4)
        return false;
      
    }
  return battleships == 1 && cruisers == 2 && destroyers == 3 && submarines == 4;
}


function validateSizeOrientation(field, visited, r, c, sz)
{
  let rowInBounds = r >= 0 && r < 10;
  let colInBounds = c >= 0 && c < 10;
  
  if(!rowInBounds || !colInBounds)
    return true;
  
  if(!field[r][c])
    return true;
  
  let loc = r + "," + c;
  if(visited.has(loc))
    return true;
  
  visited.add(loc);
  
  sz.siz++;
  
  if(disOriented(field, r+1, c+1))
    return false;
  if(disOriented(field, r-1, c+1))
    return false;
  if(disOriented(field, r+1, c-1))
    return false;
  if(disOriented(field, r-1, c-1))
    return false;
  
  if(disOriented(field,r-1,c) && (disOriented(field, r, c+1) || disOriented(field, r, c-1) ))
    return false;
  else if(disOriented(field,r+1,c) && (disOriented(field, r, c+1) || disOriented(field, r, c-1)) )
    return false;
  else if(disOriented(field,r+1,c) || disOriented(field, r-1, c))
    return validateSizeOrientation(field, visited, r+1, c, sz) || validateSizeOrientation(field, visited, r-1, c, sz);
  
  if(disOriented(field,r,c+1) && (disOriented(field, r+1, c) || disOriented(field, r-1, c) ))
    return false;
  else if(disOriented(field,r,c-1) && (disOriented(field, r+1, c) || disOriented(field, r-1, c) ))
    return false;
  else if(disOriented(field, r, c + 1) || disOriented(field, r, c-1))
    return validateSizeOrientation(field, visited, r, c+1, sz) || validateSizeOrientation(field, visited, r, c-1, sz);
  
  return true;
}

function disOriented(field, r, c)
{
  let rowInBounds = r >= 0 && r < 10;
  let colInBounds = c >= 0 && c < 10;
  
  if(!rowInBounds || !colInBounds)
    return false;
  
  return field[r][c] == 1;
}
