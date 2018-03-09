import { Component, OnInit } from '@angular/core';
import { ComicService } from '../../comic/comic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Comic } from '../../comic/comic';
import { ProfileService, Profile } from '../profile-service.service';
import { AuthenticationService } from '../authentication.service';

@Component({
    selector: 'wcm-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public comics: Comic[] = [];
    public profile: Profile;
    public profileEnabled = true;
    public href: string = '';
    public suffix: string = '';
    constructor(
        private comicService: ComicService,
        private route: ActivatedRoute,
        private router: Router,
        private profiles: ProfileService,
        private auth: AuthenticationService
    ) {
        // this.auth.onAuth(() => {
        //   this.profiles.getMyProfile().then(profile => {
        //     this.profile = profile;
        //     this.profileEnabled = this.profile.url !== null;
        //     if (!this.profileEnabled)
        //       this.profile.url = this.profile.username.toLowerCase().replace(/ /g, '-');
        //   });
        // });
        this.href = this.router.url;
        this.suffix = this.href.replace('/profile/', '');
        this.profiles.getUserProfile(this.suffix).then(profile => {
            this.profile = profile;
        });
    }

    ngOnInit() {
        const profileUrl = this.route.snapshot.paramMap.get(this.suffix);
        this.comics = this.comicService.comics;
        if (this.comicService.comics.length === 0)
            this.comicService.loadComics();
    }
}
