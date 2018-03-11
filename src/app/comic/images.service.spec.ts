import { ImagesService } from './images.service';

describe('ImagesService', () => {
    let service: ImagesService;

    beforeEach(() => {
        service = new ImagesService();
    });

    it('produces an of image url', () => {
        expect(service.getImageUrl('test')).toBeDefined();
    });

});
