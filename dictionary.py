import re
file = open( "dictionary.txt", "r" )
js = open( "dictionary_new.js", "w")
nine = open("nine.js", "w")

nine_letter = r"var nine_letter = [ "

output = r"var dictionary = [ "
for word in file:
    if re.match( r"\A[a-z]{1,9}\n", word) and word not in output:
        output = output + """"{}", \n""".format( word[:-1] )

    if re.match( r"\A[a-z]{9}\n", word) and word not in nine_letter:
        nine_letter = nine_letter + """"{}", \n""".format( word[:-1] )


output = output[:-3]
output = output + "\n]"

nine_letter = nine_letter[:-3] + "\n]"

js.write(output)
nine.write(nine_letter)