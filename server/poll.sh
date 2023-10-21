#!/bin/bash
source .env

# curl -L \
#   -H "Accept: application/vnd.github+json" \
#   -H "Authorization: Bearer $API_KEY" \
#   -H "X-GitHub-Api-Version: 2022-11-28" \
#   https://api.github.com/repos/Donrwalsh/curiouser-paradox/commits -o output.txt 

URL="https://api.github.com/repos/Donrwalsh/curiouser-paradox/commits"

response=$(curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $API_KEY" \
  -H "X-GitHub-Api-Version: 2022-11-28" -s -w "%{http_code}" $URL)

http_code=$(tail -n1 <<< "$response")  # get the last line
content=$(sed '$ d' <<< "$response")   # get all but the last line which contains the status code

echo "$http_code"
echo "$content[0]"

# for n in $content;
# do
#    echo $n
# done