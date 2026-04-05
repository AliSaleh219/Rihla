<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Governorates;
use App\Entity\User;
use App\Entity\Trips;
use App\Entity\TripImage;
use App\Entity\ItineraryDay;
use App\Entity\ItineraryActivity;
use App\Entity\Booking;
use App\Entity\Rating;
use App\Entity\Favorite;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
class AppFixtures extends Fixture
{
    public function __construct(
        private UserPasswordHasherInterface $hasher
    ) {}
    public function load(ObjectManager $manager): void
    {
        $provinces=$this->loadProvinces($manager);
        $users=$this->loadUsers($manager);
        $trips=$this->loadTrips($manager,$provinces,$users);
        $this->loadItineraries($manager, $trips);
        $this->loadBookings($manager, $trips, $users);
        $this->loadRatings($manager, $trips, $users);
        $this->loadFavorites($manager, $trips, $users);

        $manager->flush();
    }
    private function loadProvinces(ObjectManager $manager):array
    {
        $data = [
            ['Damascus',      'دمشق',      'damascus.jpg'],
            ['Aleppo',        'حلب',       'aleppo.jpg'],
            ['Latakia',       'اللاذقية',  'latakia.jpg'],
            ['Homs',          'حمص',       'homs.jpg'],
            ['Hama',          'حماة',      'hama.jpg'],
            ['Tartus',        'طرطوس',     'tartus.jpg'],
            ['Idlib',         'إدلب',      'idlib.jpg'],
            ['Daraa',         'درعا',      'daraa.jpg'],
            ['As-Sweida',     'السويداء',  'sweida.jpg'],
            ['Quneitra',      'القنيطرة',  'quneitra.jpg'],
            ['Raqqa',         'الرقة',     'raqqa.jpg'],
            ['Deir ez-Zor',   'دير الزور', 'deir-ezzor.jpg'],
            ['Al-Hasakah',    'الحسكة',    'hasakah.jpg'],
            ['Rural Damascus','ريف دمشق',  'rural-damascus.jpg'],
        ];
        $provinces = [];
        foreach ($data as [$nameEn, $nameAr, $image]) {
            $province = new Governorates();
            $province->setNameEn($nameEn);
            $province->setNameAr($nameAr);
            $province->setCoverImage($image);
            $province->setSlug(strtolower(str_replace(' ', '-', $nameEn))); 
            $province->setTripsCount(0);  
            $province->setIsActive(true);
            $manager->persist($province);
            $provinces[$nameEn] = $province;
        }
 
        return $provinces;
    }
    private function loadUsers(ObjectManager $manager):array
    {
        $data = [
            ['john.doe@example.com',      'password123', '+963900000001', 'avatar-1.jpg'],
            ['jane.smith@example.com',    'password456', '+963900000002', 'avatar-2.jpg'],
            ['bob.johnson@example.com',   'password789', '+963900000003', 'avatar-3.jpg'],
        ];
        $users = [];
        foreach ($data as [$email, $password, $phone, $avatar]) {
            $user = new User();
            $user->setEmail($email);
            $user->setPassword($this->hasher->hashPassword($user, $password));
            $user->setPhone($phone);
            $user->setAvatar($avatar);
            $manager->persist($user);
            $users[$email] = $user;
        }
        return $users;
    }
    private function loadTrips(ObjectManager $manager, array $provinces, array $users):array
    {
        $data = [
            ['Discover Damascus', 'Explore the rich history and culture of Damascus with us.', 'Damascus', 'damascus-trip.jpg'],
            ['Aleppo Adventure', 'Experience the vibrant culture and history of Aleppo.', 'Aleppo', 'aleppo-trip.jpg'],
            ['Latakia Leisure', 'Relax and enjoy the beautiful coastal city of Latakia.', 'Latakia', 'latakia-trip.jpg'],
        ];
        $trips = [];
        foreach ($data as [$title, $description, $provinceName, $image]) {
            $trip = new Trips();
            $trip->setTitle($title);
            $trip->setDescription($description);
            $trip->setGovernorate($provinces[$provinceName]);
            $trip->setImage($image);
            $manager->persist($trip);
            $trips[$title] = $trip;
        }
        return $trips;
    }
    private function loadItineraries(ObjectManager $manager, array $trips):void
    {
        $data = [
            [
                'Discover Damascus',
                1,
                'Day 1',
                'Historic highlights in Old Damascus.',
                [
                    ['09:00', 'Umayyad Mosque Visit', 'sightseeing', 'Guided walk through the mosque and nearby alleys.'],
                    ['12:30', 'Al-Hamidiyah Souq', 'shopping', 'Free time to explore local markets and crafts.'],
                    ['16:00', 'Old City Walk', 'culture', 'Walking tour covering key historic landmarks.'],
                ],
            ],
            [
                'Aleppo Adventure',
                1,
                'Day 1',
                'Explore Aleppo heritage and iconic sites.',
                [
                    ['09:30', 'Citadel of Aleppo', 'sightseeing', 'Visit the citadel and surrounding viewpoints.'],
                    ['13:00', 'Al-Madina Souq', 'shopping', 'Traditional market experience with local products.'],
                    ['17:00', 'Al-Jdayde Quarter', 'culture', 'Evening stroll through the historic district.'],
                ],
            ],
            [
                'Latakia Leisure',
                1,
                'Day 1',
                'A relaxed day by the coast and city center.',
                [
                    ['10:00', 'Beach Time', 'relax', 'Morning break on Latakia beachfront.'],
                    ['14:00', 'Latakia Museum', 'culture', 'Explore regional history and archaeology exhibits.'],
                    ['18:00', 'Corniche Walk', 'leisure', 'Sunset walk along the waterfront.'],
                ],
            ],
        ];
        foreach ($data as [$tripTitle, $dayNumber, $dayTitle, $dayDescription, $activities]) {
            $trip = $trips[$tripTitle];
            $itineraryDay = new ItineraryDay();
            $itineraryDay->setTrip($trip);
            $itineraryDay->setDayNumber($dayNumber);
            $itineraryDay->setTitle($dayTitle);
            $itineraryDay->setDescription($dayDescription);
            $manager->persist($itineraryDay);

            foreach ($activities as $index => [$time, $title, $type, $detail]) {
                $activity = new ItineraryActivity();
                $activity->setDay($itineraryDay);
                $activity->setTime($time);
                $activity->setTitle($title);
                $activity->setType($type);
                $activity->setDetail($detail);
                $activity->setSortOrder($index + 1);
                $manager->persist($activity);
            }
        }
    }
    private function loadBookings(ObjectManager $manager, array $trips, array $users):void
    {        $data = [
            ['Discover Damascus', 'john.doe@example.com'],
            ['Aleppo Adventure', 'jane.smith@example.com'],
            ['Latakia Leisure', 'bob.johnson@example.com'],
        ];
        foreach ($data as [$tripTitle, $userEmail]) {
            $booking = new Booking();
            $booking->setTrip($trips[$tripTitle]); 
            $booking->setUser($users[$userEmail]);
            $booking->setTravelersCount(2);
            $booking->setTripDate(new \DateTime('+7 days'));
            $booking->setTotalPrice('100.00');
            $booking->setStatus('pending');
            $booking->setCreatedAt(new \DateTimeImmutable());
            $manager->persist($booking);
        }
    }
    private function loadRatings(ObjectManager $manager, array $trips, array $users):void
    {
        $data = [
            ['Discover Damascus', 'john.doe@example.com', 5],
            ['Aleppo Adventure', 'jane.smith@example.com', 4],
            ['Latakia Leisure', 'bob.johnson@example.com', 3],
        ];
        foreach ($data as [$tripTitle, $userEmail, $rating]) {
            $ratingObj = new Rating();
            $ratingObj->setTrips($trips[$tripTitle]);
            $ratingObj->setUser($users[$userEmail]);
            $ratingObj->setRate($rating);
            $manager->persist($ratingObj);
        }
    }
    private function loadFavorites(ObjectManager $manager, array $trips, array $users):void
    {
        $data = [
            ['Discover Damascus', 'john.doe@example.com'],
            ['Aleppo Adventure', 'jane.smith@example.com'],
            ['Latakia Leisure', 'bob.johnson@example.com'],
        ];
        foreach ($data as [$tripTitle, $userEmail]) {
            $favorite = new Favorite();
            $favorite->setTrip($trips[$tripTitle]);
            $favorite->setUser($users[$userEmail]);
            $favorite->setCreatedAt(new \DateTimeImmutable());
            $manager->persist($favorite);
        }
    }
}
