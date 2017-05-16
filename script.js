//                                          //
//              UI ELEMENTS                 //
//                                          //

var st = document.getElementById('start_buttonl'),
    he = document.getElementById('help_buttonl'),
    ho = document.getElementById("how_to_play"),
    no = document.getElementById("note"),
    me = document.getElementById("menu_title"),
    ba = document.getElementById('back_button'),
    ba1 = document.getElementById('back_button1'),
    ba2 = document.getElementById('back_button2'),
    g1 = document.getElementById("word_puzzle_buttonl"),
    g2 = document.getElementById("number_puzzle_buttonl"),
    mg1 = document.getElementById('word_game'),
    mg2 = document.getElementById('number_game');



function start(){
        st.style.display = "none";
        he.style.display = "none";
        ho.style.display = "none";
        me.style.display = "inline";
        ba1.style.display = "inline";
        g1.style.display = "inline";
        g2.style.display = "inline";
    }
function back_title(){
        st.style.display = "inline";
        he.style.display = "inline";
        ba.style.display = "none";
        no.style.display = "none";
        ho.style.display = "none";
        me.style.display = "inline";
    }
function help(){
        st.style.display = "none";
        he.style.display = "none";
        ba.style.display = "inline";
        no.style.display = "inline";
        ho.style.display = "inline";
        me.style.display = "none";
    }
function back_game_selection(){
        st.style.display = "inline";
        he.style.display = "inline";
        ho.style.display = "none";
        me.style.display = "inline";
        g1.style.display = "none";
        g2.style.display = "none";
        ba1.style.display ="none";
    }
function gw1(){
        g1.style.display = "none";
        g2.style.display = "none";
        me.style.display = "none" ;
        ba1.style.display = "none";
        ba2.style.display = "inline";
        mg1.style.display = "inline";
        mg2.style.display = "none";
}
function gw2(){
        g1.style.display = "none";
        g2.style.display = "none"; 
        me.style.display = "none";
        ba1.style.display = "none";
        ba2.style.display = "inline";
        mg1.style.display = "none";
        mg2.style.display = "inline";
}

function back_game_menu(){
        g1.style.display = "inline";
        g2.style.display = "inline"; 
        me.style.display = "inline";
        ba1.style.display = "inline";
        ba2.style.display = "none"; 
        mg1.style.display = "none"; 
        mg2.style.display = "none";

}






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




