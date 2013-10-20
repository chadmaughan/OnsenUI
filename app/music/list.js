/*===================================================================
Musiclist
===================================================================*/

function musiclistController ($scope, Data) {
    
    var from;
    init();


    function init(){
        
        $scope.query = {
            text: ''
        };
        
        if(Data.type === "playlist"){ 
            from = Data.type;
            var playlistMusics = localStorage.getItem(Data.selectedPlaylist.name);
            $scope.musics = JSON.parse(playlistMusics);
            
        }else if(Data.type === "Artist"){ 
            from = "";
            var artistMusics = new Array();
            var playlists = JSON.parse(localStorage.getItem("playlist"));
            
            for(var playlistCount = 0; playlistCount <playlists.length;  playlistCount++){
                var playlistMusics = JSON.parse(localStorage.getItem(playlists[playlistCount].name));
               
                for(var musicCount = 0; musicCount <playlistMusics.length;  musicCount++){
                   artistMusics.push(playlistMusics[musicCount]);
                }
            }
           
            $scope.query.artist_name = Data.selectedArtist.artist_name;
            
            $scope.musics = artistMusics;
            
        }else{
            // from Music
            from = "";
            var allMusics = new Array();
            var playlists = JSON.parse(localStorage.getItem("playlist"));
            if(playlists){
                for(var playlistCount = 0; playlistCount <playlists.length;  playlistCount++){
                    var playlistMusics = JSON.parse(localStorage.getItem(playlists[playlistCount].name));
                   
                   if(playlistMusics){
                        for(var musicCount = 0; musicCount <playlistMusics.length;  musicCount++){
                           allMusics.push(playlistMusics[musicCount]);
                        }
                   }
                }
                
                allMusics = unique(allMusics);
                //alert(JSON.stringify(allMusics));
            }
            $scope.musics = allMusics;
            
        }
    
    }
    
    var nameIndex = [
        { key:"A",value:1},
        { key:"B",value:1},
        { key:"C",value:1},
        { key:"D",value:1},
        { key:"E",value:1},
        { key:"F",value:1},
        { key:"G",value:1},
        { key:"H",value:1},
        { key:"I",value:1},
        { key:"J",value:1},
        { key:"K",value:1},
        { key:"L",value:1},
        { key:"N",value:1},
        { key:"O",value:1},
        { key:"P",value:1},
        { key:"Q",value:1},
        { key:"R",value:1},
        { key:"S",value:1},
        { key:"T",value:1},
        { key:"U",value:1},
        { key:"V",value:1},
        { key:"W",value:1},
        { key:"X",value:1},
        { key:"Y",value:1},
        { key:"Z",value:1}
    ];
    $scope.usedIndex;
    
    $scope.showNameIndexCheck = function(music){
            
        for(var count =0; count < nameIndex.length; count++ ){
            var obj = nameIndex[count];
            var re = new RegExp( '^'+ obj.key, "i");
            var str = music.name;
            
            if (str.match(re) && obj.value == 1) {
                $scope.usedIndex = obj.key;
                nameIndex[count].value = 0
                return true;
            }
        }
        return null;
    }
    
    $scope.isPlaylist = function(){
        if(from === "playlist"){
            return true;
        }else{
            return null;
        }
    }
    
    $scope.addNewMusic = function(){
        $scope.ons.navigator.pushPage('01_playlist/musicSearch.html', 'Music Search');
    }
    
    $scope.playMusic = function(music,index){
        var selectedMusic = music;
        Data.selectedMusic = selectedMusic;
        Data.selectedMusicIndex = index + 1;
        Data.selectedMusicSum = $scope.musics.length;
        Data.selectedMusicList = $scope.musics;
        Data.showMusicNumber = Data.selectedMusicIndex +'/'+$scope.musics.length;
        
        $scope.ons.navigator.pushPage('00_common/musicPlay.html', Data.showMusicNumber);
    }
}


//Uniqie Check
function unique(array) {
    var storage = {};
    var uniqueArray = [];
    var value;
    
    for(var i=0; i<array.length; i++) {
        value = array[i];
        
        if(!(value.name in storage)) {
            storage["name"] = value.name;
            uniqueArray.push(value);
        }
        
    }
    return uniqueArray;
}