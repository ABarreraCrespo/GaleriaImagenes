"use strict";

function MyError(name="Error generico",message = "Default Message") { //creo un objeto error generico del que heredarán los errores especificos
    this.name = name;
    this.message = message;
}
MyError.prototype = Object.create(Error.prototype);
MyError.prototype.constructor = MyError;

//Creo los distintos tipos de errores necesarios
let tituloVacio =new MyError("tituloVacio","El titulo no puede ser vacio");
let nullCategory =new MyError("nullCategory","La categoria no puede ser null");
let categoriaExistente = new MyError("categoria Existente","La categoria ya existe");
let categoriaNoRegistrada = new MyError("categoriaNoRegistrada","La categoria no esta registrada");
let imagenNull = new MyError("imagenNull","La imagen no puede ser null");
let imagenInexistente = new MyError("imagenInexistente","La imagen no existe");
let autorNull = new MyError("autorNull","El autor no puede ser nulo");
let autorInexistente = new MyError("autorInexistente","El autor no existe");
let urlVacia = new MyError("urlVacia","No se ha introducido URL");
let objetoMalConstruido = new MyError("objetoMalConstruido","Objeto mal construido");


//Constructor de Author
function Author(nickname, email, avatar){
    if(nickname===undefined || email===undefined){//validacion de parámetros obligatorios
        throw objetoMalConstruido;
    }
    //Atributos provados del objeto
    let _nickname=nickname;
    let _email=email;
    let _avatar=avatar;

    //Getters y Setters de author
    Object.defineProperty(this, "nickname", {
        get: function() {
            return _nickname;
        },
        set: function(value){
            _nickname=value;
        }
        
    });

    Object.defineProperty(this, "email", {
        get: function() {
            return _email;
        },
        set: function(value){
            _email=value;
        }
        
    });

    Object.defineProperty(this, "avatar", {
        get: function() {
            return _avatar;
        },
        set: function(value){
            _avatar=value;
        }
        
    });
    
}
Author.prototype = {};
Author.prototype.constructor =  Author;


//constructor de Image
function Image(title, description,url,coords){
    if(title===undefined){ //comprobacion de parametros obligatorios
        throw tituloVacio;
    }
    if(url===undefined){
        throw urlVacia;
    }

    //definicion de atributos privados
    let _title=title;
    let _description=description;
    let _url=url;
    let _coords=coords;

        //Getters y Stters de Image
    Object.defineProperty(this, "title", {
        get: function() {
        return _title;
        },
        set: function(value){
        _title=value;
        }
        
    });
    Object.defineProperty(this, "description", {
        get: function() {
        return _description;
        },
        set: function(value){
        _description=value;
        }
        
    });

    Object.defineProperty(this, "url", {
        get: function() {
        return _url;
        },
        set: function(value){
        _url=value;
        }
        
    });
    Object.defineProperty(this, "coords", {
        get: function() {
        return _coords;
        },
        set: function(value){
        _coords=value;
        }
        
    });
}
Image.prototype = {};
Image.prototype.constructor =  Image;

//Creación de los constructores de objetos que heredan de Image
function Landscape(title, description,url,coords){
    //invocamos al superconstructor
    Image.call(this,title, description, url, coords);
};
Landscape.prototype = Object.create(Image.prototype);
Landscape.prototype.constructor = Landscape;

function Portrait(title, description,url,coords){
    //invocamos al superconstructor
    Image.call(this,title, description, url, coords);
};
Portrait.prototype = Object.create(Image.prototype);
Portrait.prototype.constructor = Portrait;

//Constructor de Category
function Category(title, description){
    let _title=title;
    let _description=description;

    //Getters y Setters de Category
    Object.defineProperty(this, "title", {
        get: function() {
        return _title;
        },
        set: function(value){
        _title=value;
        }
        
    });
    Object.defineProperty(this, "description", {
        get: function() {
        return _description;
        },
        set: function(value){
        _description=value;
        }
        
    });
}
Category.prototype = {};
Category.prototype.constructor =  Category;


//Constructor de Coords
function Coords(Latitude, Longitude){
    if(Latitude===undefined || Longitude===undefined){ //comprobacion de los parametros obligatorios
        throw objetoMalConstruido;
    }
    let _latitude=Latitude;
    let _longitude=Longitude;

    //Getters y Setters de Coords
    Object.defineProperty(this, "latitude", {
        get: function() {
        return _latitude;
        },
        set: function(value){
        _latitude=value;
        }
        
    });

    Object.defineProperty(this, "longitude", {
        get: function() {
        return _longitude;
        },
        set: function(value){
        _longitude=value;
        }
        
    });
}
Coords.prototype = {};
Coords.prototype.constructor =  Coords;


//Constructor de Gallery mediante patrón singleton
let Gallery =(function (){
    let instantiated;  //campo privado para guardar la instancia única

	function init() {  //funcion encargada de generar el objeto unico
		function Gallery(){
            
            

            //propiedades privadas
            let _title = "Galeria de Fotos";
            let _categories = [];
            let _images = [];
            let _authors = [];

            let _defaultCategory="DefaultCategory";
            let _defaultAuthor="DefaultAuthor";

            //patron iterador

            Object.defineProperty(this, 'iteratorAuthors', {
                get:function(){
                    // Variable que mantiene la última posición recorrida por el array.
                    let nextIndex = 0;
                    // Devolvemos el objeto iterador para recorrer la lista.
                    return {
                        next: function(){ // Devuelve el siguiente objeto de la lista.
                            return nextIndex < _authors.length ?
                            {value: _authors[nextIndex++], done: false} :
                            {done: true};
                        }
                    }
                }
            });

            Object.defineProperty(this, 'iteratorCategories', {
                get:function(){
                    // Variable que mantiene la última posición recorrida por el array.
                    let nextIndex = 0;
                    // Devolvemos el objeto iterador para recorrer la lista.
                    return {
                        next: function(){ // Devuelve el siguiente objeto de la lista.
                            return nextIndex < _categories.length ?
                            {value: _categories[nextIndex++], done: false} :
                            {done: true};
                        }
                    }
                }
            });

            Object.defineProperty(this, 'iteratorImages', {
                get:function(){
                    // Variable que mantiene la última posición recorrida por el array.
                    let nextIndex = 0;
                    // Devolvemos el objeto iterador para recorrer la lista.
                    return {
                        next: function(){ // Devuelve el siguiente objeto de la lista.
                            return nextIndex < _images.length ?
                            {value: _images[nextIndex++], done: false} :
                            {done: true};
                        }
                    }
                }
            });
            
            //getters y setters
            Object.defineProperty(this, 'title', {
                get:function(){
                    return _title;
                },
                set:function(value){
                    if (!value) throw new EmptyTitle("title");
                    _title = value;
                }
            });

            Object.defineProperty(this, 'categories', {
                get:function(){
                    return _categories;
                }
            });

            Object.defineProperty(this, 'authors', {
                get:function(){
                    return _authors;
                }
            });

            Object.defineProperty(this, 'images', {
                get:function(){
                    return _images;
                }
            });

            //metodos publicos 
            this.addCategory = function(categoria){
                if(categoria===null){
                    throw nullCategory;
                }
                _categories.forEach(function(element){ //uso un foreach en vez de include para encontrar 
                    if(element.category===categoria){ //si ya esta la categoria porque es u array de objetos literales
                        throw categoriaExistente;
                    }
                });
            
                
                _categories.push({
                    category: categoria,
                    images: []
                });
                return _categories.length;
            };

            this.removeCategory = function(categoria){
                
                let aux= _categories.findIndex(function(element){//encontramos el indice de la categoria
                    return (element.category===categoria) 
                        
                        
                });
                if(aux===-1){
                    throw categoriaNoRegistrada;//Si la categoria no se encuentra se lanza la excepcion
                }else{//si se encuentra se elimina
                    _categories.splice(aux,1);
                }
            
                
                return _categories.length; //si se encuentra se elimina y se devuleve la longitud
            };

            this.addImage = function(image, category, author){

                if(image===null){
                    throw imagenNull; //si no se introduce image se lanza la excepcion correspondiente
                }
            
                
                let index = 0;
                _images.push({ //introducimos un ojeto literal al array de imagenes
                    image: image,
                    author: author.nickname
                });
            
                let aux =  _categories.findIndex(function(element){//comprobamos si la categoria ya se encuenta en el array y sacamos su index
                    return (element.category===category);
                        
                });
            
                if(aux===-1){//si no está, introducimos la nueva categoria
                    _categories.push({
                        category: category,
                        images: [image]
                    });
                }else{//si ya está introducimos la nueva imagen a la categoria existente
                    _categories[aux].images.push(image);
                }
            
                if(!_authors.includes(author)){//si el autor no esta lo agregamos al array
                    _authors.push(author);
                }
                return _images.length;
            };

            this.removeImage=function(image){
                

               
            
               let aux =  _images.findIndex(function(element){//comprobamos si la imagen esta en el array
                   return (element.image===image)
               });
           
               if(aux===-1){//si no está lanzamos la excepcion
                   throw imagenInexistente;
               }else{//si estaba la eliminamos
                _images.splice(aux,1);
               }
            
                return _images.length;
            };

            this.getCategoryImages = function(category){
                if(category===null){ //si la categoria introducida es null lanzamos excepcion
                    throw nullCategory;
                }
                
               
               let aux=_categories.findIndex(function(element){//iteramos el array de categorias hasta encontrar la que coincida y sacar su posicion
                   
                   return (element.category===category);//si coincide retorna true, lo que guardará su index
                       
                       
               });
               if(aux!=-1){ //si el indice no es -1 mostramos el array de imagenes de la categoria
                   return _categories[aux].images;
               }else{
                   return "Categoria no encontrada";
               }
               

            };

            this.addAuthor = function(autor){
                if(autor===null){ //comprobamos que elautor no sea null
                    throw autorNull;
                }
                if(!_authors.includes(autor)){//si el autor no esta en el array lo metemos
                    _authors.push(autor);
                }
                return _authors.length;
            };

            this.removeAuthor = function(autor){

        
                let aux=_authors.indexOf(autor)//comprobamos si el autor esta en el array obteniendo su indice
                    
                if(aux!==-1){//si el indice es distinto de -1 lo eliminamos
                    _authors.splice(aux,1);
                }else{//si no lanzamos excepcion
                    throw autorInexistente;
                }

                
                return _authors.length;
            };

            this.getAuthorImages = function(autor){

                if(autor===null){ //comprobamos que el autor no sea null
                    throw autorNull;
                }
            
                let aux =[]; //array para guardar las imagenes qeu correspondan
            
                _images.forEach(function(element){//recorrecmos el array de para comparar los autores
                    if(element.author===autor.nickname){
                        aux.push(element); //si el autor coincide guardamos la imagen en el array
                    }
                });
                return aux;
            };

            this.getPortraits = function(){
                let aux =[]; //array para las imagenes que sean portraits
            
                _images.forEach(function(element){//recorremos el array
                    if(element.image instanceof Portrait){ //si la imagen es una instancia de portrait la guardamos en el array
                        aux.push(element);
                    }
                });
                return aux;
            };

            this.getLandscapes = function(){
                let aux =[];//array para las imgenes que sean landscapes
            
                _images.forEach(function(element){ //recorremos el array
                    if(element.image instanceof Landscape){//si la imagen es una instancia de landscape la guardamos en el array
                        aux.push(element);
                    }
                });
                return aux;
            };
        }
        Gallery.prototype = {};
		Gallery.prototype.constructor = Gallery;
        
		let galeria = new Gallery();
		Object.freeze(galeria); //impedimos que se puedan modificar las propiedades o estructura del objeto
        return galeria;
    }
    return {
		// Devuelve un objeto con el método getInstance
		getInstance: function () {
			if (!instantiated) { //Si instantiated es undefined llama a init
				instantiated = init(); //instantiated contiene el objeto único
			}
			return instantiated; //devuelve el campo privado
		}
	};
})();





//Funcion para realizar las pruebas
function pruebas(){
    let image1 = new Image("Imagen1","muy bonita","gsgsdg","sdfs");
    let image2 = new Image("Imagen2","preciosa","gsgsdg","sdfs");
    let retrato = new Portrait("Retrato","muy bonita","gsgsdg","sdfs");
    let escapetierraXD = new Landscape("Escapetierraoloquesea","preciosa","gsgsdg","sdfs");
    let autor = new Author("Paco","correo","avatar");
    let autor2 = new Author("Pepo","correo","avatar");
    let autor3 = new Author("Jimmy","correo","avatar");
    let categoria = new Category("cat","descripcion");
    let categoria2 = new Category("cat2","descripcion2");
    let categoria3 = new Category("cat3","descripcion2");
    let galeria = Gallery.getInstance();
    let iteradorCat = galeria.iteratorCategories;
    let iteradorImg = galeria.iteratorImages;
    let iteradorAut = galeria.iteratorAuthors;
    //let obj=iteradorCat;


    console.log("Añadir categoria: ",galeria.addCategory(categoria));
    //console.log(" categoria: ",categoria.title);
    console.log("iterator categoria: ", iteradorCat.next().value.category.title);
   // console.log("iterator categoria: ",iteradorCat.next().done);
    //console.log("Categorias:",galeria.categories);
    console.log("Eliminar categoria: ",galeria.removeCategory(categoria));
    console.log("iterator categoria: ", iteradorCat.next());
    //console.log("Categorias:",galeria.categories);
    console.log("Añadir una imagen: ",galeria.addImage(image1,categoria,autor));
    console.log("iterator imagen: ", iteradorImg.next().value.image.title);
    //console.log("Imagenes: " , galeria.images);
    console.log("Eliminar una imagen: ",galeria.removeImage(image1));
    console.log("iterator imagen: ", iteradorImg.next());
    //console.log("Imagenes: " ,galeria.images);
    
    console.log("Añadir una imagen: ",galeria.addImage(image2,categoria,autor2));
    console.log("Imagenes de la misma categoria: ",galeria.getCategoryImages(categoria));
    console.log("Añadir un autor: ",galeria.addAuthor(autor3));
    console.log("iterator autor: ", iteradorAut.next().value.nickname);
    console.log("iterator autor: ", iteradorAut.next().value.nickname);
    console.log("iterator autor: ", iteradorAut.next().value.nickname);
   // console.log("Autores: ",galeria.authors);
    console.log("Eliminar un autor: ",galeria.removeAuthor(autor3));
    console.log("iterator autor: ", iteradorAut.next());
    // console.log("Autores: ",galeria.authors);


    console.log("Añadir una imagen: ",galeria.addImage(image1,categoria,autor2));
    console.log("Añadir una imagen: ",galeria.addImage(image2,categoria,autor2));
    console.log("Ver imagenes de un autor: ",galeria.getAuthorImages(autor2));

    console.log("Añadir un retrato: ",galeria.addImage(retrato,categoria,autor2));
    console.log("Añadir un landscape: ",galeria.addImage(escapetierraXD,categoria,autor2));
    console.log("Retratos: ",galeria.getPortraits());
    console.log("LandScapes: ",galeria.getLandscapes());

    //probando excepciones
  

    try{
    galeria.addCategory(null);
    } catch(error){
    console.log(error.message);

    }
    
    try{
    galeria.addCategory(categoria);
    
    } catch(error){
    console.log(error.message);

    }

    try{
    galeria.removeCategory(categoria3);
    
    } catch(error){
    console.log(error.message);

    }
    
    try{
    galeria.addImage(null);
    
    } catch(error){
    console.log(error.message);

    }

    try{
    galeria.removeImage();
    
    } catch(error){
    console.log(error.message);

    }
}

pruebas();
   