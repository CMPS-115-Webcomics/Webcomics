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

    constructor(
        private comicService: ComicService,
        private route: ActivatedRoute,
        private router: Router,
        private profiles: ProfileService,
        private auth: AuthenticationService
    ) {

    }

    ngOnInit() {
        const profileUrl = this.route.snapshot.paramMap.get('profileUrl');
        this.profiles.getUserProfile(profileUrl).then(profile => {
            this.profile = profile;
            console.log(profile);
        });

    }
}
