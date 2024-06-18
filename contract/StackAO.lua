local json = require("json")
local ao = require("ao")

Members = Members or {}   -- List of all the participants' process IDs
Messages = Messages or {} -- Stores current messages with their timestamps and process IDs
QUERIES = QUERIES or {}   -- Stores questions mapped to their answers
QUESTION = QUESTION or {}

function ValueExists(table, value)
    for _, v in ipairs(table) do
        if v == value then
            return true
        end
    end
    return false
end

Handlers.add(
    "Register",
    Handlers.utils.hasMatchingTag("Action", "Register"),
    function(msg)
        if ValueExists(Members, msg.From) then
            Handlers.utils.reply("You are already registered!")(msg)
        else
            table.insert(Members, msg.From)
            print(msg.From .. " just joined the community")
            Handlers.utils.reply("Welcome to the community")(msg)
        end
    end
)

Handlers.add(
    "PostQuestion",
    Handlers.utils.hasMatchingTag("Action", "PostQuestion"),
    function(msg)
        -- Check if the message, Question, or sender is invalid
        if (not msg.Question) then
            print("Error: Invalid message, question, or process.")
            return
        end

        --Initialize QUERIES if not already present
        if not QUERIES[msg.Question] then
            QUERIES[msg.Question] = {}
        end

        Handlers.utils.reply("Received question")(msg)
    end
)

Handlers.add(
    "PostAnswer",
    Handlers.utils.hasMatchingTag("Action", "PostAnswer"),
    function(msg)
        -- Check if the message, Question, or sender is invalid
        if (not msg.Question) then
            print("Error: Invalid message, question, or process.")
            return
        end

        --Initialize QUERIES if not already present
        if not QUERIES[msg.Question] then
            QUERIES[msg.Question] = {}
        end

        table.insert(QUERIES[msg.Question], msg.Answer)

        Handlers.utils.reply("Answer added")(msg)
    end
)

Handlers.add(
    "GetQuestions",
    Handlers.utils.hasMatchingTag("Action", "GetQuestions"),
    function(msg)
        local data = json.encode(QUERIES)
        ao.send({
            Target = msg.From,
            Data = data
        })
    end
)