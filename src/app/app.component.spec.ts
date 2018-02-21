import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AppModule } from './app.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './user/authentication.service';
import { ComicService } from './comic/comic.service';
import { MessageService } from './message/message.service';
import { SearchService } from './comic/search.service';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { ComicModule } from './comic/comic.module';
import { DexieService } from './dexie.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        CommonModule,
        HttpClientModule,
        UserModule,
        ComicModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        AuthenticationService,
        ComicService,
        MessageService,
        SearchService,
        DexieService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in an element with .toolbar-title class', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.toolbar-title').textContent).toContain('ComicHub');
  }));

});
