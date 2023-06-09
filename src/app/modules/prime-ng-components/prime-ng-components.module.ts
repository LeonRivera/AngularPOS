import { NgModule } from '@angular/core';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';
import {ChipsModule} from 'primeng/chips';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {TooltipModule} from 'primeng/tooltip';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {ToolbarModule} from 'primeng/toolbar';
import {CardModule} from 'primeng/card';
import {MenubarModule} from 'primeng/menubar';
import {StepsModule} from 'primeng/steps';
import {BadgeModule} from 'primeng/badge';
import {DividerModule} from 'primeng/divider';
import {SidebarModule} from 'primeng/sidebar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ImageModule} from 'primeng/image';
import {CarouselModule} from 'primeng/carousel';
import {PasswordModule} from 'primeng/password';
import {KeyFilterModule} from 'primeng/keyfilter';
import {AutoCompleteModule} from 'primeng/autocomplete';



const PrimeNgComponents = [
  ButtonModule,
  TableModule,
  DropdownModule,
  InputTextModule,
  CalendarModule,
  DynamicDialogModule,
  FileUploadModule,
  ToastModule,
  ChipsModule,
  MessagesModule,
  MessageModule,
  TooltipModule,
  AvatarModule,
  AvatarGroupModule,
  ToolbarModule,
  CardModule,
  MenubarModule,
  StepsModule,
  BadgeModule,
  DividerModule,
  SidebarModule,
  ConfirmDialogModule,
  ImageModule,
  CarouselModule,
  PasswordModule,
  KeyFilterModule,
  AutoCompleteModule
  
]

@NgModule({
  declarations: [],
  imports: [
    PrimeNgComponents
  ],
  exports: [
    PrimeNgComponents
  ]
})
export class PrimeNgComponentsModule { }
