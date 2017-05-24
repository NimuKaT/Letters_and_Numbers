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
//           Regular Expressions            //
//                                          //

// Numbers
var number = /-?(?:[1-9]\d*|0)(?:\.\d+)?/;
var number_match = new RegExp( number.source, "g");
var valid_number = /(?:100|[1-9]\d?)(?!\d\.)/g;

// Addition and subtraction
var addition = /\+/;
var subtraction = /[_]/;
var add_sub = new RegExp( "[" + addition.source + subtraction.source.slice(1,-1) + "]" );

// Multiplication and division
var multiplication = /[\*x\u{d7}]/u;
var division = /[\/\u{f7}]/u;
var mult_div = new RegExp( "[" + multiplication.source.slice(1,-1) + division.source.slice(1,-1) + "]", "u" );

// Valid symbols
var valid_signs = new RegExp( "["+addition.source+subtraction.source.slice(1,-1)+multiplication.source.slice(1,-1)+division.source.slice(1,-1)+"]","u");

// Equation types of each level of the Order of operation
var multi_div_equation = new RegExp( number.source+mult_div.source+number.source, "u");
var add_sub_equation = new RegExp( number.source+add_sub.source+number.source );

// Valid equation of indefinite length
var equation_with_brackets = new RegExp( "\\("+number.source+"(?:"+valid_signs.source+number.source+")+\\)", "u");
var equation_with_out_brackets = new RegExp(number.source+"(?:"+valid_signs.source+number.source+")+", "u");

// Valid characters in input
var valid_input_characters = new RegExp( "[" + "\\d\\(\\)" + valid_signs.source.slice(1,-1) + "]", "u" );





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

function evaluate( equation ){

    var new_equation = modify_equation( equation );
    var result = false;
    var current_group;
    var current_operation;
    var current_numbers;
    var current_result = false;
    var replace_targert;
    var index = 0;

    if ( check_valid_equation( new_equation ) ){
        
        // Continues loop until only one number remains
        // Will still return for negative and decimal answers
        while( ! new_equation.match( /^\-?\d+(?:\.\d+)?$/) ){
            
            // Finds a valid group of equation in the most nested group
            current_group = new_equation.match( equation_with_brackets );

            if( ! current_group ){

                current_group = new_equation.match( equation_with_out_brackets );

                if( !current_group ){

                    console.log( "No valid equation could be found" );
                    break;

                }
            }

            if ( multi_div_equation.test(current_group[0]) || add_sub_equation.test(current_group[0]) ) {
                
                replace_targert = current_group[0];

                while ( ! current_group[0].match( /^\(\-?\d+(?:\.\d+)?\)$/ ) && ! current_group[0].match( /^\-?\d+(?:\.\d+)?$/) ) {

                    // Multiplication and division
                    current_operation = current_group[0].match( multi_div_equation );
                    if ( current_operation ){

                        current_numbers = current_operation[0].match( number_match );

                        if( current_operation[0].match( multiplication ) ){

                            current_result = Number( current_numbers[0] ) * Number( current_numbers[1] );

                        }
                        else if( current_operation[0].match( division ) ){

                            current_result = Number( current_numbers[0] ) / Number( current_numbers[1] );

                        }
                        else{

                            console.log("A multiplication or division operation was found but the symbol could not be found");
                            current_result = false;
                            break;

                        }
                    }
                    else{

                        // Addition and subtraction
                        current_operation = current_group[0].match( add_sub_equation );

                        if ( current_operation ){

                            current_numbers = current_operation[0].match( number_match );

                            if( current_operation[0].match( addition ) ){

                                current_result = Number( current_numbers[0] ) + Number( current_numbers[1] );

                            }
                            else if( current_operation[0].match( subtraction ) ){

                                current_result = Number( current_numbers[0] ) - Number( current_numbers[1] );

                            }
                            else{

                                console.log("A addition or subtraction operation was found but the symbol could not be found");
                                current_result = false;
                                break;

                            }

                        }

                    }

                    // Replace equation with value
                    if ( current_operation ){

                        current_group[0] = current_group[0].replace( current_operation[0], current_result );

                    }

                    else{

                        console.log("Loop did not terminate after no further equations were found");
                        current_result = false;
                        break;

                    }

                }
                if( current_group[0].match( /^\(\-?\d+(?:\.\d+)?\)$/ ) ){

                    new_equation = new_equation.replace( replace_targert, current_group[0].slice(1,-1) );

                }
                else{

                    new_equation = new_equation.replace( replace_targert, current_group[0] );

                }


            }
            else{

                console.log("Loop did not terminate after no further equations could be found");
                current_result = false;
                break;

            }

        }

        if ( !current_result === false){

            result = Number( new_equation );

        }

    }

    return result;

}

function check_valid_numbers( equation, number_list ){

    var valid_numbers = number_list.slice(0);
    var numbers = equation.match( valid_number );
    var is_valid = false;
    var search_hit = false;

    for( var i = 0; i < numbers.length; i++){

        search_hit = false;

        for( var it = 0; it < valid_numbers.length; it++ ){

            if ( numbers[i] == valid_numbers[it] ){

                valid_numbers.splice( it, 1 );
                search_hit = true;
                break;

            }

        }        

        if ( !search_hit ) {

            break;

        }

    }

    if ( search_hit ){

        is_valid = true;

    }

    return is_valid;

}

function check_valid_equation( equation ){
    
    var is_valid = false;
    var new_equation = modify_equation( equation );

    while( new_equation.match( equation_with_brackets ) ){

        new_equation = new_equation.replace( equation_with_brackets, "100" );

    }
    
    if ( new_equation.match( equation_with_out_brackets ) ){

        if ( new_equation.match( equation_with_out_brackets )[0] == new_equation ) {

            is_valid = true;

        }

    }

    return is_valid;

}

function modify_equation( equation ){

    var new_equation = equation.replace( / /g, "" );
    new_equation = new_equation.replace( /-/, "_");
    new_equation = new_equation.replace( /--/, "_-");

    var matched_object = new_equation.match( /\d\(/g)
    var numerical_value = "";

    if (matched_object){

        for (var i = 0; i < matched_object.length; i++) {

            numerical_value = matched_object[i].match(/\d/)[0];
            new_equation = new_equation.replace( numerical_value+"(", numerical_value+"*(" );

        }

    }

    return new_equation;

}

function generate_target_number( numbers ){

    var target_number = -1;
    var working_numbers;
    var number_of_numbers;
    var indexes;
    var random_index;
    var random_index_one;
    var random_index_two;

    while( target_number < 0 || target_number > 10000 || ! Number.isInteger( target_number ) ){
        
        working_numbers = numbers.slice(0);
        number_of_numbers = 0;
        
        if( numbers.length > 5){
        
            number_of_numbers = numbers.length -  3 + Math.floor( Math.random() * 3 );
            
        }
        else{

            number_of_numbers = numbers.length;

        }

        
        indexes = generate_number_list( 0, number_of_numbers - 1 );
        random_index = 0;

        for( var i = 0; i < numbers.length - number_of_numbers ; i++){

            random_index = Math.floor( Math.random() * indexes.length );
            working_numbers.splice( random_index, 1);

        }

        random_index_one = 0;
        random_index_two = 0;

        while( working_numbers.length > 1 ){
           
            random_index_one = Math.floor( Math.random() * working_numbers.length );
            random_index_two = Math.floor( Math.random() * working_numbers.length );
            
            while( random_index_one == random_index_two){

                random_index_two = Math.floor( Math.random() * working_numbers.length );

            }

            operation = Math.floor( Math.random() * 4 );

            switch(operation){

                case 0:
                    result = working_numbers[random_index_one] + working_numbers[random_index_two]
                    break;

                case 1:
                    result = working_numbers[random_index_one] - working_numbers[random_index_two];
                    break;

                case 2:
                    result = working_numbers[random_index_one] * working_numbers[random_index_two];
                    break;

                case 3:
                    result = working_numbers[random_index_one] / working_numbers[random_index_two];
                    break;

            }

            working_numbers.splice( random_index_one, 1 );
            working_numbers.splice( random_index_two, 1 );

            working_numbers.push(result);

        }

        target_number = working_numbers[0];

    }

    return target_number;

}

function numbers_game(){

    this.numbers;
    this.target_number;
    this.user_answer;

    this.init = function( hardmode ){

        if( !hardmode){

            this.numbers = generate_numbers( 4, 1);

        }
        else{

            this.numbers = generate_numbers( 3, 2 );

        }

        this.target_number = generate_target_number( this.numbers );
        this.user_answer = false;

    }

    this.answer = function( input ){

        if( check_valid_numbers( input, this.numbers ) ){

            if( check_valid_equation( input ) ){

                this.user_answer = evaluate( input );

                if( ! Number.isInteger(this.user_answer) ){

                    this.user_answer = false;
                    console.log("Your answer is not a whole number! Only whole numbers are accepted as an answer.");

                }
                else if( this.user_answer < 0 ){

                    this.user_answer = false;
                    console.log("Your answer is a negative number! Only positive numbers are accepted as an answer.");

                }

            }
            else{
            
                this.user_answer = false;
                console.log("Your answer is not a valid equation! Make sure your answer can be evaluated and no illegal symbols are used.");
            
            }

        }
        else{

            this.user_answer = false;
            console.log("Your answer contains numbers not included in the list! Make sure you only include numbers that are in the list.")

        }

    }

    this.get_score = function(){



    }

}



//                                          //
//              LETTERS GAME                //
//                                          //

function random_nine_letter(){

    var index_range = nine_letter.length;
    var index = Math.floor( Math.random() * index_range );
    var letter = nine_letter[index];

    return letter

}

function shuffle_letter( word ){
    
    var output = word.split("");
    var str_length = output.length;
    var repeats = str_length - 3;
    var index = 0;
    var random_index_one = 0;
    var random_index_two = 0;
    var temp_value = "";

    while (index < repeats) {

        while (random_index_one == random_index_two){

            random_index_one = Math.floor( Math.random() * str_length);
            random_index_two = Math.floor( Math.random() * str_length);

        }

        temp_value = output[random_index_one];
        output[random_index_one] = output[random_index_two];
        output[random_index_two] = temp_value;
        temp_value = "";

        index++;

        if ( output == word ){

            index = 0;

        }

    }

    return output;
}

function letters_game(){

    this.random_word;
    this.letters;
    this.user_answer;


    this.init = function( hardmode ){

        this.random_word = random_nine_letter();
        this.letters = shuffle_letter(this.random_word);
        this.user_answer = false;

    }

    // To be optimised with reg. exp.
    this.check_valid_input = function( input ){
        
        var input_letters = input.split('');
        var input_length = input_letters.length;
        var valid_letters = this.letters.slice(0);
        var itterator = 0;
        var search_hit;
        var is_valid = false;
        
        // Validates all characters are letters with length 1 to 9
        if(input.match(/\w{1,9}/)){
         
            // Validate input to only contains letters from the list
            for( var i = 0; i < input_length; i++ ){
                
                search_hit = false;
                
                for( var it = 0; it < valid_letters.length; it++   ){
                
                    if ( input_letters[i] === valid_letters[it] ){
                        
                        valid_letters.splice( it, 1 );
                        search_hit = true;
                        break;
                
                    }
                
                }

                if ( !search_hit ){
                    
                    break;
                
                }

                if ( i == input_length - 1 ){
                    
                    if ( this.is_word( input ) ){

                        is_valid = true;

                    }

                }

            }

        }

        return is_valid;

    }

    this.is_word = function( word ){
        
        var is_word = false;
        var min = 0;
        var max = dictionary.length; 
        var index = Math.floor( min +(( min - min ) / 2) );

        while ( max - min > 1 ){

            if ( dictionary[index] === word ){

                is_word = true;
                break;

            }

            if ( word < dictionary[index] ){

                max = index;

            }
            else if ( word > dictionary[index] ){

                min = index;

            }
            else{

                console.log("binary search error");
                break;

            }

            index = Math.floor( min +(( max - min ) / 2) );

        }

        return is_word;
    }

    this.get_score = function(){



    }

    this.answer = function( input ){
        if( this.check_valid_input( input ) ){

            this.user_answer = input;

        }
        else{

            this.user_answer = false;

        }
        
    }

}





//                                          //
//              DEBUG CODE                  //
//                                          //




