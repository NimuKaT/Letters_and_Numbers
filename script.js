function generate_numbers( small_numbers, large_numbers ){
    
    var i = 0;
    var array_index = 0;
    var random_numbers = [];
    var small_numbers_list = generate_number_list( 1, 9 );
    var large_numbers_list = generate_number_list( 10, 99);
    var random_index = -1;

    var small_numbers_multiplyer = 10;
    var large_numbers_multiplyer = 100;
    
    while ( i < small_numbers ){
        random_index = Math.floor( Math.random() * small_numbers_multiplyer );
        random_numbers[array_index] = small_numbers_list[random_index]
        small_numbers_multiplyer--;
        i++;
        array_index++;
    }

    i = 0;
    
    while ( i < large_numbers ){
        random_numbers[array_index] = Math.floor( Math.random() * 90) + 10;
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