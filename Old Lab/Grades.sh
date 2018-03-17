#!/bin/bash
#need to pass in StudentGrades.txt as a command line argument
#variable to hold filename that is passed through command line

#check if file was passed in command line
if [ -z "$1" ]; then
    printf "Usage: Grades.sh filename\n" 
    
else
  fileName="$1"

  #declaring arrays and variables
  averageArray=()
  uniqueIDArray=()
  firstNameArray=()
  lastNameArray=()
  gradeSum=0
  gradeAverage=0
  #index=0

#sorting the file in place by third column then second column 
#-k tells field, -n indicates number, -s stabilize sort?, -o sort file in place
tac $fileName | sort -k3,3 -k2,2 -k1,1n -s $fileName -o $fileName
#read in file and parse each line into variables
while read -r uniqueID firstName lastName scoreOne scoreTwo scoreThree; do
  uniqueIDArray[index]=$uniqueID
  firstNameArray[index]=$firstName
  lastNameArray[index]=$lastName
  #adding all 3 scores together
  let gradeSum="scoreOne+scoreTwo+scoreThree"
  #averaging the score sume
  let gradeAverage="gradeSum/3"
  averageArray[index]=$gradeAverage
  #printing out information in desired format
  printf "%s" $gradeAverage
  printf "[%s]" $uniqueID
  printf "%s, " $lastName
  printf "%s\n" $firstName
  #index=$(($index + 1))
#end of while loop
done < <(tr -d '\r' < "$1")

fi
#Output Format
#averageScore [uniqueID] lastNameArray, firstName
