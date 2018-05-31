function Photo(filename, location){
    this.filename = filename;
    this.location = location;
}

function Album(){
    this.photos = [];
    this.addPhoto = function(photo){
	this.photos.push(photo);
    };
    this.addPhotos = function(photos){
	this.photos = this.photos.concat(photos);
    }
    this.listAllPhotos = function(){
	var list = "[ "
	for (i = 0; i < this.photos.length; i++)
	    list += (this.photos[i].filename + " ");
	list += "]";
	console.log(list);
    }
    this.accessPhoto = function(index){
	return this.photos[index];
    }
}

var sunset = new Photo("sunset","central park");
var dog = new Photo("dog","my heart");
var newAlbum = new Album();
newAlbum.addPhoto(dog);
newAlbum.listAllPhotos();
newAlbum.addPhoto(sunset);
newAlbum.listAllPhotos();
newAlbum.addPhotos([sunset,dog]);
newAlbum.listAllPhotos();
var fourthPhoto = newAlbum.accessPhoto(3); 
console.log(fourthPhoto.filename + ", " + fourthPhoto.location);
