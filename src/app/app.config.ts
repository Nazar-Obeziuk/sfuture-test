import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    // provideClientHydration(), 
    importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"sfuture-1638e","appId":"1:512947895647:web:d8c9a535be8b94a3654aea","storageBucket":"sfuture-1638e.appspot.com","apiKey":"AIzaSyAhOHwBRB_I5SFKXKkge-g91HAZixOQ74o","authDomain":"sfuture-1638e.firebaseapp.com","messagingSenderId":"512947895647"}))), 
    importProvidersFrom(provideAuth(() => getAuth())), 
    importProvidersFrom(provideStorage(() => getStorage())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    provideAnimations(),
    provideToastr(),
  ]
};

// ,"locationId":"us-central"