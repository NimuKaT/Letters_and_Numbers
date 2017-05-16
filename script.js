//                                          //
//              UI ELEMENTS                 //
//                                          //





//                                          //
//              NUMBERS GAME                //
//                                          //


function generate_numbers( small_numbers, large_numbers ){
    
    var i = 0;
    var array_index = 0;
    var random_numbers = [];

    // Creates a list of all the valid integers in the groups which are uniquely selected
    var small_numbers_list = generate_number_list( 1, 9 );
    var large_numbers_list = generate_number_list( 10, 99);

    var random_index = -1;

    // Specifies the range of the index of the number list
    var small_numbers_multiplyer = 9;
    var large_numbers_multiplyer = 90;
    
    while ( i < small_numbers ){
        
        random_index = Math.floor( Math.random() * small_numbers_multiplyer );
        random_numbers[array_index] = small_numbers_list[random_index];
        small_numbers_list.splice( random_index, 1 );

        small_numbers_multiplyer--;
        
        i++;
        array_index++;

    }

    i = 0;
    
    while ( i < large_numbers ){

        random_index = Math.floor( Math.random() * large_numbers_multiplyer );
        random_numbers[array_index] = large_numbers_list[random_index];
        large_numbers_list.splice( random_index, 1 );
        
        large_numbers_multiplyer--;

        i++;
        array_index++;
    }
    
    return random_numbers;
}

function generate_number_list( min, max ){

    var i = 0;
    var number_list = [];
    max++;

    while ( min < max ){
        number_list[i] = min;
        i++;
        min++;
    }

    return number_list;
}

var number = "\s*(\d{1,2}|100)\s*";
var operator = "\s*[+,\-,/,*,x]\s*";
var single_operation = new RegExp("/\s*"+number+operator+number+"\s*/");






//                                          //
//              lETTERS GAME                //
//                                          //

function random_nine_letter(){

    var index_range = nine_letter.length;
    var index = Math.floor( Math.random() * index_range );
    var letter = nine_letter[index];

    return letter

}

function shuffle_letter( letter ){

}





//                                          //
//              DEBUG CODE                  //
//                                          //




