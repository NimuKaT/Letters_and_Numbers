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

var number = /\-?\d+\.?\d*/g;

var multi_div_equation = /\-?\d+\.?\d*[\*x\/]\-?\d+\.?\d*/g;

var add_sub_equation = /\-?\d+\.?\d*[\+\-]\-?\d+\.?\d*/g;

var equation_with_brackets = /\(\-?\d+\.?\d*(?:[\+\-\*\/x]\-?\d+\.?\d*)+\)/g;
var equation_with_out_brackets = /\-?\d+\.?\d*(?:[\+\-\*\/x]\-?\d+\.?\d*)+/g;

var test_equation = "  23  + ( 34 - 23 * ( 21 / 7) + 4) x 2    "
var test_equation2 = "  23  +  34 - 23 *  21 / 7 + 4 x 2    "

function calculate_equation( equation ){
    
    var new_equation = equation.replace(/ /g, "");
    var regular_expression_object;
    var current_bracket;
    var current_expression;
    var numbers_object;
    var result = 0;

    while (new_equation.match(/\-?\d*\.?\d*/)){

        current_bracket = new_equation.match(equation_with_brackets);
        if (current_bracket){    
            current_expression = current_bracket[0].match(multi_div_equation)
            
            while( current_expression ){

                if( current_expression[0].match( /[/]/ ) ){
                    number_object = current_expression[0].match( number );
                    result = Number(number_object[0]) / Number(number_object[1]);
                }
                
                else if( current_expression[0].match( /[x\*]/ ) ){
                    number_object = current_expression[0].match( number );
                    result = Number(number_object[0]) * Number(number_object[1]);
                }

                new_equation = new_equation.replace( current_expression[0].toString(), result.toString() );
                
                result = 0;

                current_bracket = new_equation.match(equation_with_brackets);
                if(!current_bracket){
                    break;
                }
                current_expression = current_bracket[0].match(multi_div_equation);
            }

            
            if(current_bracket){
                current_expression = current_bracket[0].match(add_sub_equation)

                while( current_expression ){
                    if( current_expression[0].match( /[+]/ ) ){
                        number_object = current_expression[0].match( number );
                        result = Number(number_object[0]) + Number(number_object[1]);
                    }
                    else if(current_expression[0].match( /[-]/ ) ){
                        number_object = current_expression[0].match( number );
                        result = Number(number_object[0]) - Number(number_object[1]);
                    }

                    new_equation = new_equation.replace( current_expression[0].toString(), result.toString() );
                    result = 0;

                    current_bracket = new_equation.match(equation_with_brackets);
                    if(!current_bracket){
                        break;
                    }
                    current_expression = current_bracket[0].match(add_sub_equation)
                }

            }

            var temp = new_equation.match( /\(\-?\d+\.?\d*(?=\))/ )[0];
            var value = temp.slice(1, temp.length);
            new_equation = new_equation.replace( new_equation.match(/\(\-?\d+\.?\d*\)/)[0], value );
        }
        else{
            current_bracket = new_equation.match(equation_with_out_brackets);
            while( current_expression ){

                if( current_expression[0].match( /[/]/ ) ){
                    number_object = current_expression[0].match( number );
                    result = Number(number_object[0]) / Number(number_object[1]);
                }
                
                else if( current_expression[0].match( /[x\*]/ ) ){
                    number_object = current_expression[0].match( number );
                    result = Number(number_object[0]) * Number(number_object[1]);
                }

                new_equation = new_equation.replace( current_expression[0].toString(), result.toString() );
                
                result = 0;

                current_bracket = new_equation.match(equation_with_out_brackets);
                if(!current_bracket){
                    break;
                }
                current_expression = current_bracket[0].match(multi_div_equation);
            }

            current_expression = current_bracket[0].match(add_sub_equation)
            if(current_bracket){
                current_expression = current_bracket[0].match(add_sub_equation)

                while( current_expression ){
                    if( current_expression[0].match( /[+]/ ) ){
                        number_object = current_expression[0].match( number );
                        result = Number(number_object[0]) + Number(number_object[1]);
                    }
                    else if(current_expression[0].match( /[-]/ ) ){
                        number_object = current_expression[0].match( number );
                        result = Number(number_object[0]) - Number(number_object[1]);
                    }

                    new_equation = new_equation.replace( current_expression[0].toString(), result.toString() );
                    result = 0;

                    current_bracket = new_equation.match(equation_with_out_brackets);
                    if(!current_bracket){
                        break;
                    }
                    current_expression = current_bracket[0].match(add_sub_equation)
                }

            }
            break;
        }
    }
    return new_equation;

     

    return regular_expression_object;
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

    this.random_word = random_nine_letter();
    this.letters = shuffle_letter(this.random_word);
    this.input = "";

    this.check_valid_input = function( input ){
        
        var input_letters = input.split();
        var input_length = input_letters.length();
        var valid_letters = this.letters;
        var itterator = 0;
        var search_hit;
        var is_valid = false;
        
        for( var i = 0; i < input_length; i++; ){
            
            search_hit = false;
            
            for( var it = 0; it < valid_letters.length(); it++; ){
            
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

                is_valid = true;

            }

        }

        return is_valid;

    }

    this.get_score = function(){

    }

    this.log_word = function(){
        console.log(this.random_word);
    }

}





//                                          //
//              DEBUG CODE                  //
//                                          //




