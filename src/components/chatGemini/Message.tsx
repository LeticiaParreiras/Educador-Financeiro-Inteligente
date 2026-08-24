import { MessageCircle } from "lucide-react"

export interface PropsMessage{
    from: 'user' | 'ia'
    text: string
}
export function Message({from, text}:PropsMessage){
    const classNames = from=='user'? 'text-muted-foreground' : 'text-foreground'
    return(
        <div className={classNames}>
            <span className="flex text-muted-foreground font-bold gap-1">
                <MessageCircle strokeWidth={2} /> <h3>{from=='user'? 'Você': 'Resposta da IA'}</h3>
            </span>
            <p className="text-sm leading-relaxed">{text}</p>
        </div>
    )
}