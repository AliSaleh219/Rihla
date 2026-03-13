<?php

namespace App\Enum;

enum siteTypeEnum: string
{
    case HISTORICAL = 'historical';
    case RELIGIOUS = 'religious';
    case ARCHAEOLOGICAL = 'archaeological';
    case NATURAL = 'natural';
    case CULTURAL = 'cultural';
    case TOURISTIC = 'touristic';
    case ARCHITECTURAL = 'architectural';
}
?>