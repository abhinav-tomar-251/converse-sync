import getConversationbyPage from "@/app/actions/getConversationbyPage";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";

interface Iparams {
    conversationId: string;
};

const ConversationPage = async ({params}: {params: Iparams}) => {
 const conversation = await getConversationbyPage(params.conversationId);
 const messages = await getMessages(params.conversationId);  

    if(!conversation) {
        return(
            <div className="h-full lg:pl-80">
                <div className="flex flex-col h-full">
                    <EmptyState />
                </div>
            </div>
        );
    }

    return(
        <div className="h-full bg-indigo-50 lg:pl-80">
            <div className="flex flex-col h-full">
                <Header conversation = {conversation} />
                <Body initialMessages={messages}/>
                
                <Form/>
            </div>
        </div>
    )
};

export default ConversationPage;