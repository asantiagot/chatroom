# FINANCES CHATROOM

## Description
Browser-based chatroom built with Node.js. It implements Socket.io as broker, and allows users to chat and request the stock price of a given financial entity. This is done with a decoupled bot that parses the received CSV and returns a message into the chatroom.

## Mandatory features achieved
1. Allow users to post messages as commands with the format /stock=<stock_code
2. Decoupled bot that calls API and parses response as a message into the chatroom
3. Order messages by timestamps, display only last 50

## Pending items
1. Allow user registration (Users schema and DB Operations are ready, just need to implement the routing)
