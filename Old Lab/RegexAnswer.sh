#!/bin/bash
#Write the regex expression necessary to calculate the answer for each:

if [ -z "$1" ]; then
    printf "Usage: RegexAnswers.sh filename\n" 

else
	fileName="$1"

	printf "FileName: %s\n" $fileName


	# 1. How many lines end with a number? Answer = 15371
	grep -e "[0-9]$" $fileName | wc -l

	# 2. How many lines do not start with a vowel? Answer = 52331 
	grep -e "^[^aeiouAEIOU]" $fileName | wc -l

	# 3. How many 12 letter (alphabet only) lines? Answer 1257
	grep -o -w -E '^[A-Za-z]{12}$' $fileName | wc -l

	# 4. How many phone numbers are in the dataset (format: ‘_ _ _-_ _ _-_ _ _ _’)? Answer = 767
	grep -e "^[0-9]\{3\}\-[0-9]\{3\}\-[0-9]\{4\}$" $fileName | wc -l

	# 5. How many city of Boulder phone numbers (Eg: starting with 303-_ _ _-_ _ _ _)? Answer = 406
	grep -e "^[303]\{3\}\-[0-9]\{3\}\-[0-9]\{4\}$" $fileName | wc -l

	# 6. How many begin with a vowel and end with a number? Answer = 1571
	grep -x "^[aeiouAEIOU].*[0-9]$" $fileName | wc -l

	# 7. How many email addresses are from geocities? (Eg: end with'geocities.com')? Answer 6619
	grep 'geocities.com$' $fileName | wc -l

	# 8. How many email addresses are in ‘first.last’ name format and involve someone who’s first name starts with a letter in the first half of the alphabet? Answer = 333
	grep -E -o "^[a-mA-M][a-zA-Z]*\.[a-zA-Z]+@.*" $fileName | wc -l
fi
