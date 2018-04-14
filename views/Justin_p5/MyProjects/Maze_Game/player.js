function Player(){
   this.players = 0; //starts with 0 players while maze is generating
   this.show = function(){
      current.highlight(); //visually show which cell player is on
      for (var i = 0; i < grid.length; i++){
         grid[i].show();
      }
   };

}
