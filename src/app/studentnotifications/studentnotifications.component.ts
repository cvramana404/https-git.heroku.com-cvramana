import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../data.service';
import * as jspdf from 'jspdf'
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-studentnotifications',
  templateUrl: './studentnotifications.component.html',
  styleUrls: ['./studentnotifications.component.css'],
  providers:[{provide:'Window', useValue:window}]
})
export class StudentnotificationsComponent implements OnInit {



  searchTerm:string;
  arr:object;
  data4:any[]=[];

  constructor(@Inject('Window') private window:Window, private ds:DataService, private http:HttpClient) { }

  ngOnInit() 
  {

    // this.arr=this.ds.sendToB();

    //getting data from admin notifications to database to student notification
    this.http.get<any>("api/admin/adminnotifications").subscribe(temp=>{
      if(temp['message']=='Token is not valid')
      {
        alert(temp['message'])
      }
      else
      {
        this.data4=temp;
      } 
    });
    
  }

  save()
   {
   var doc =new jspdf();
   doc.text(20,20,"ramana");
   doc.addImage('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8QEBIPDw8PEA8VEBUNDw8PFRUPDw8PFRUWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQFTAdHR0uLSsrNSs3Ny0rLTctLSsrNy01Ky0yKzAtLS4tLSstKystLS0rKy0rKy0rKysuLS01Mv/AABEIAOoA1wMBEQACEQEDEQH/xAAcAAEBAAIDAQEAAAAAAAAAAAAAAwIHBAUGAQj/xABIEAACAQICAQ0KCwgDAAAAAAAAAgEDBAURIQYHEiIxQVFxdIGRs9EUFSM0UlRhk6G0ExckJTJCcnOxwdIzVXWDssLh8ENEYv/EABoBAQEBAQEBAQAAAAAAAAAAAAABAgQFAwb/xAAsEQEAAQIGAAQGAwEBAAAAAAAAAQIRAwQSMTJRExQhgSIzQVJhkUJxwQUj/9oADAMBAAIRAxEAPwDeIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8rq81YLhtOIppFW6dWenTadiiU1yhqtSY0wkTMRo0zMxEGqaYn1lJnpojEtd/F6jNsa6oueUfBrsMo9ExJdcRtTCaZ7dd8ZOMeeXGf3jx+ZfEnqP0afy+fGRjG53bcZ/eP2jxJ6j9Gn8vnxk4x57cesftHiT1H6NP5ZJrjYy25eXE/zG7R4k9R+jTHbP4wcb87ufWN2jxJ6j9GmO2D64+MRom8uI/mN2jxJ6j9Gn8ia4+MTuXlxOjOcqj6I6R4k9R+jS+Rrk4v57cesftHiT1H6NP5I1zMXj/uV+eo8/mPE/Efo0/l3GC68OLpUWHq0qi55bGqsyrTvQzZ5xHpjSNUTvSWntv7Uhqlp4hQmpCzSrJMU69GZ2U03mIaMp+ssrMTE78SZqi2yxN3emVAAAAAAAAAAAAAAANP64NnWvK94lBJqV5uKVgi55RFOnbU6+7OhV2Vy8zPojgg3Hr6QzM2vMvH2+srczEfCXturb8Ir1IjnnYn0jL1PjOYjpeNZirnn3wp5/ctP9xfL1dp5iOj4mKmeffCn6mf1l8tV2eZjpjOsxU/eCcP7Gf1l8tV2nmY6YxrN1I3MQWOKi36x5WrtPNR0+TrP1P3ivqm/WXylXZ5qPtTbWgffv1n+VP6y+Tq7Tzcfa+JrT1F0xfJ6mZ/uLGUq+5PNx9qU607x/3k9VP6h5KfuPOR9qTa1T+ep6qf1F8lP3HnY+1x6+tlcrppXFGo0aYVoann6InTHSSclVEek3WM5Tf1htTW1V6NzQR1ZXq2VxSrLO7DWtWjKZxwx3TU08Ex6Dlq9PSXVExPrDaJhoAAAAAAAAAAAAAAA8Zhix3Vijb8XyrHE1lZzP9MH3weT443Fy5k7XExmSowmSowZjSJsxURZiok7FRB2KiLsaZcd2KiWy0lR3+ErHfKynhsr6Z49nYx+EQePmOcvXwOEPdHO+4AAAAAAAAAAAAAAB43DPGcV5enuVoffB5PjjcV5k7nCxmTSMGkqJNJUTZioi7FRF2KiDuaRB3LZlB2NIlD6RZIelwefnCx5DfdbZHjZnnL2Mvwh7o533AAAAAAAAAAAAAAANfalWmauL5zM/O9WNOnRFKjEHThc/aHwxeLs2k7nCxmSom0lRJmKiLMVEXY0iDuWyIO5WUHY0l0HcrKUPpKQ9Vgs/OFjyK+6yyPFzPOXs5fhD3hzPuAAAAAAAAAAAAAAAa81K/tMX/i9bqqJ1YXP2hz43F2TSd0OFNmKibMaRF2LZEGYqIu5qzKDuVEHcrLju5qyIOxUTh9JZgh7DA5+cLHkV91lkeHmvmS9rL8Ie9OZ9wAAAAAAAAAAAAAADXepafCYv/F63VUTqweftDnxuLnsx6EOBJmKiTsWyIOxqyIuxWUHctkQdzVmXHdy2RB3NWRB2LZE1bTBZI3e1wCfl9hyK+6yyPCzXzJe3l+EPfnK+4AAAAAAAAAAAAAABrvU2krVxeGiYnvtVbKYynKaNGYnimJiec6sDn7Q58fi5TsejDz5RdzVkRdi2RF2NWZQdy2RB3NWZcd3LZEHctkQdjVmUXYqJq2mCysbvbYDWWMQw6JnKWtL9F9LbK0bLoVp5jwM1H/pL28vwhsQ5XQAAAAAAAAAAAAAAAeFtJ+UYry9PcrU6stzc+Y4oux6cQ86ZRdjTKLsWyIO5qyIOxbIg7GrMuO7lsiDsaZRdiog7lGCtpgTssbvY4VPzlg/3WIf0UDwc1zq/r/Xt5fhDZ5xugAAAAAAAAAAAAAAA11gtdnq4szTpjFXTg2qUKCL7Fg68vHx+0ObMT8I7HqRDzZQdjVkQdjVkQdi2ZQdi2RB2NIg7FZQdioi7FEGYowRtMCdljd7bB4mcSwjRM5UcQmfRGwoRp6Y6TwM18yf6/wBe3gcIbQON0AAAAAAAAAAAAAAAGtMBnb4v/F63VUTty3P2hy5jh+yox6kQ82UHY1ZEHY0ynlM7nPO5EccjZiuumiLzLi3NVV+tnPo0QbpiZcs5iqqfhh1dzfNGmInLi0H0iiH2o1zu66cciJyZc44V3eiTXhvvGFMuYlwrrskaGjhjengmN6TFnzmJibSwdioizAYI2mBOy07tj6lp+XWHI77rLI/PZv5kvcy/BsU5H3AAAAAAAAAAAAAAANdWVvFKtiqxOeeJzVznR+0tbepMc2yy5jsys3rcuZ4OHUY9eIeZKDsaZcd3NRDFdUUxMy49S5ltou5uz/vCaim3rLhpw6sWq9SM5R274dlNEU7IuxbK6++sqdWNtGTbzrob/POaiZhqmuaXmpepa1eGN/L6NROHj3eKRMuq1OLS79a0MsMs5xMZxxBxzExNpTZiowRtMGZap3bL1J6b2x5FfdZZH57N/Ml7eBwbGOV9wAAAAAAAAAAAAAADXzz8oxTl6e42p2ZPm5c1xdRUY9mHlyi7GmXWYnc7GIjhzn/fafXDpu+ddOq0MbXQkTvztp59z2Eq3WIs+uxBB2KiDsUdNqgo7Klst9Jzz/8AM5RMfhPMSrZ9sCq1du3GwCvnTZJn6LZx6FbT+MT0kolrM02qie3YNJpzsKbaYJLdO7Z2pGfltjyK+6yyPz2b+ZL2sDg2Ocr7gAAAAAAAAAAAAAAGvK8+HxTl6e42p25Lm5c1xdI7HtQ8qUHYrLpsY+kv2cvb/k++FsOTRfaL9mPwMTHrKMHYIi7FRFmA67GHiKNT7OXPMxEGa+MvpgxeuHVanv8Akn7Ef1GMP6vvmv4+/wDjs2k+jlY020wZq2bp3bR1H+O2PIr7rLI/P5v5kvawODZByvsAAAAAAAAAAAAAAAa5up8PinL09xtTuyXOXLmuLoajntQ8mUHY0jg36bKM9+NPNv8A5H0w5tLMoWtbRsZ5uLgNV0/VIlm0mBFpCIuwHndUF7E+CWdydk872e9H++g+OLV9HblsP+U+zk4VQ2FKM91tvPozyy9kQaoi0PjjVaq/6XZjT5sac6YM1N07tqajfHLHkV91lkeBm/mS9nA4tknK+wAAAAAAAAAAAAAABre9nw+KcvT3G1O7I85cua4vOOx7kPJlJmNMouwHWXtKYjNc8t3Ruwfamq+6U7utjG5XQ67KOGJybsn2EqpiHR4F49JfHx+j5NTiyXtPjNcQz5avuHW3uOO2cU42EeVuvzcB8asWfo+1GWiPWr1cbCbP4Rtk0bRZznP6zb0fnP8Akzh06pv9G8bE0RaN5d87HS4UWkyrCnO2gzU3Tu2xqLn5ZY8ivussjwc18x7GDxbKOV9gAAAAAAAAAAAAAADWmIz4bFOXp7lanfkecuTNcXmKjHuw8mUmYqJMwRNmKjg3VnSqaXSJnhjaz0xuhunEqp2lwXwi3jTKzlu6XbKPaYmin6t+PidugrZVasJRSFXPYpERlo32bf8ATxHLPxVWph2U/BTeuXoKNJaawi7kRu78zvzJ1RERFocFVU1TeWLSBJ2IrCm22gxU3Tu2zqK8cseR33WWR4Wa5vXweLZhyvsAAAAAAAAAAAAAAAayxSfDYpy9PcrU78hzlyZvi8o7Huw8mUmYrKbMUSZgiTMB0GqC/wD+FZ9NSeCN2F/OeY58av8AjDry+F/OfZnhFn8Guzb6bRzqu9H5zzcBrCo0xed5Yx8TVNo2hzGk+j4pOxlpBpIsMac7aOMxU+lO7bmojxyx5HfdZZHh5rm9bB4tmnK+oAAAAAAAAAAAAAABq7F58NinL19ytT0Mhzn2cma4vIux7sPJTZispswE2Yo4OJXsUklvrToSOFuyD5116Yu+mFh66rOjwm1mo81H0rE5zn9d93T+M8x8MOjVN5dWNiaadMO8ZjpcSLSZVFpI0k0mWoY0520cZmW6d23tQvjdlyK+62yPDzXN6uFxbOOV9QAAAAAAAAAAAAAADVmNT4XFOXr7lanoZDnPs5M1xeNdz3oeTKbOVlOWAwZgOLcUKbzEuitMaI2UZ5R6DE0xO8N011U7TZ8RVWNisQsb0Roj0i0RskzMzeWDMBJmMtIsxlYSaSNQxpTtoMS+lO7cGoSflljyO+6yyPFzXN6eFxbQOV9QAAAAAAAAAAAAAADVWPz4XE+Xr7lanof8/nLkzXF4d20nvQ8mWEsVGEsBgzEE2YgmzEVJmMqkzEaSaTLUJtJGoY0p20GZbp3bi1B+N2PI77rLI8TNc3pYXFtE5n1AAAAAAAAAAAAAAANT6op8LifL19ytT0P+fzly5ri8I7aT3nkSwlgjGWIqcsBgzGbqmzEuqTMRUmYyqbSRqEmkjUQUp20GZfSluTUD43Y8jvussjxczzejh8W0jmfQAAAAAAAAAAAAAAA1LqmnwuJ8vX3G1PQyHOfZy5ri8A7aT3bvJlhLC4wliXGMsS4nLGVTZiLZgzEaskzEVNpI1CcyRqIfKU7aDMt0tz63/jdlyO+6yyPGzPN6GHs2mcz6AAAAAAAAAAAAAAAGotVM+FxPl6+5Wp35DnPs5szxa8dtJ7l3lSxliXRhLC4xliKwljKsGYKm0kWybSRqzBpI1EJtJGoh8pTto4zMtw3Vre+N2XI77rLI8fM83dh7NpnM+gAAAAAAAAAAAAAABqDVZPhcT5evuVqd+R5S5szxa4dtJ7N3lywlgjHZBXyWIWYSxFYTJGmDSFYNJGk5kjUQnMkagpTto4zMtw3Xrd+NWXI77rLI8jM83ZRs2qcz6AAAAAAAAAAAAAAAGmNX1xFGtiGz3Gu1qTv7FWs7dVbizpvHNPAdWWxIw6omdpfHFomqm0Nbd0020xUSeJoPapxaJj0qh5c0VRPrEk1l8pemC66e00z0+fCr5S9MDXT2aZ6fPhV8pemCaqe10z0xmqvlL0wNVPa6Z6YTUXyo6YJqp7XTPTGai8MdME1R21FM9MJqLwx0wTVHbUUz0nNSOGOmCao7W09JtUjhjpgmqntqInpgtZYmJlo6TFWJREetUPpTTPTd2tm2zurSY3Fs7xp4YV6lpC9Mo3QeTi1apmqHXTFos2yfFoAAAAAAAAAAAAAAA1xrr6kq9ys3Vok1anwUUbi3X6dWmszKOnC67J9G/DTHAbptPozPp6vzld4RcU2lWoVoynLSjRzZ7gmiqPoao7Q7iq+RJnTPS3g7jqeRPsFp6LvncdTyJ9gtPS3O46nkz7Baei53HU8mfYLSXO46nkz7Baei773HU8ifYLT0XO4qvkSLT0lzuKr5Dc2kaZ6Lw5mGYLc1aqKtvXeZnQqU2lmngjhk1GHV0mqO36b1tNS9WzpNWuYhbmqqU/g4nZRb0EzlKee/OyZ2meFvQKpjaFjuXtDCgAAAAAAAAAAAAAAADj3NjRqftaNKp9tFf8YLEzGxZx5wKynds7X1VPsLrq7TTHT53hsvM7X1NPsL4lXcppjo7w2Xmdr6mn2DxK+5NMdHeGy8ztfU0+weJX90mmOjvDZeZ2vqafYPEr7k0x0d4bLzO19TT7B4lfcmmOjvDZeZ2vqafYPEr7k0x0d4bLzO19TT7B4lXcrpjp9jArKNy0tY4qVPsJrq7NMdOVb2lKnGVOnTpxwIsJHsgkzdViAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/2Q==','JPEG',15,40,180,160);
   doc.save('new.pdf');
   }

}
