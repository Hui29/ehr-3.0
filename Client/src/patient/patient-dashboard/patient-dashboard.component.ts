import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientServiceService } from '../services/patient-service.service';
import {RegisterComponent} from '../register/register.component'
import { BlockchainService } from 'src/services/blockchain.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.sass'],
})
export class PatientDashboardComponent implements OnInit {
  

  isPatient = false;

  isCollapse: boolean = false;

  checkProgress: boolean = true;
  progressWarn: boolean = false;
  progressMsg: string = 'Checking Patient....';

  constructor(
    private router: Router,
    private patientService: PatientServiceService,
    private blockchainServices: BlockchainService,
  ) {}

  buttonTxt = '';
 
  
  ngOnInit(): void {

    this.router.navigate(['patient/patient-dashboard']);
    this.checkIfPatient();
  }

  checkIfPatient() {
    this.progressWarn = false;
    this.progressMsg = 'Checking Patient....';
    this.patientService
      .checkIsPatient()
      .then((r) => {
        if (r) {
          this.isPatient = true;
          console.log(r);
        }
      })
      .catch((err: any) => {
        this.progressWarn = true;
        this.progressMsg = 'Only Patient have Access <br> if you are not registerd please Register';
        this.buttonTxt = 'Register';

      });
  }

  onRegister() {
    this.router.navigate(['register']);
  }

  /*  checkisPatient() {
    this.blockchainServices
      .checkIsPatient()
      .then((r: any) => {
        console.log(r);
        this.patientID = this.blockchainServices.account
        this.showProgress = false
      })
      .catch((err: any) => {
        console.log(err);
        this.progressWarn = true;
        this.progressMsg = 'Only Patient can book appointments <br> if you are not registerd please Register';
        this.buttonTxt = 'Register';
      });
  }*/

  
}
