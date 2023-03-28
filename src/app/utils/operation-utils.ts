import { MessageService } from "primeng/api";

export class OperationUtils {

    constructor(protected messageService: MessageService = new MessageService()){
    }

    throwErrorMessageServicePrimeNg(e:any):void{
        console.log("throwing message service");
        // this.messageService.add({severity:'error', summary:'Ha ocurrido un error', detail:e.error.message});
        this.messageService.add({severity:'error', summary:'Ha ocurrido un error', detail:"error"});
    }

}
