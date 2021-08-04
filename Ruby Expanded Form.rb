
#Resource: https://stackoverflow.com/questions/52282186/write-number-in-expanded-form-ruby-not-printing-out-zeros

##Note: The below is not my solution. I will explain my understanding of the user defined function below  
# in as much detail as possible within the code comments so as to avoid committing total plagiarism

#Declare method with an integer parameter
#The .digits method takes the digits given as an argument and puts them into reverse order in an array
#The each_with_index method then iterates through each digit in the abovementioned array to apply code to them
##The .map method takes every element (each digit) in the array and runs the block each to return an appropriate value... 
#  ^ this has to be done because a 1 in a three digit number, for example, needs to be printed as 100 as opposed to just 1 when the method is called
#The .select method allows us to ignore any arguemnts that are equal to 0. It will just return a blank space
#The.reverse() method undoes the reverse order the the digits have been stored in by the .digits method
#The .join() method joins each digit in the array by concatenating them together with a " + "
def expanded_form(num)
  num.digits.each_with_index.map{| val, idx | val * (10 ** idx)}.select{|x| x != 0}.reverse.join(" + ")
end

  #Call method and enter arguments within a puts statement to see results
  puts(expanded_form(12));
  puts(expanded_form(42));
  puts(expanded_form(80594));
 

