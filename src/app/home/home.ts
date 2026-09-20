import { Component, inject } from '@angular/core';
import { HeroSection } from '../hero-section/hero-section';
import { SearchPanel } from '../search-panel/search-panel';
import { QuickAccess } from '../quick-access/quick-access';
import { RecentSearches } from '../recent-searches/recent-searches';
import { Footer } from '../footer/footer';
import { NewsTicker } from '../news-ticker/news-ticker';
import { UserContextService } from '../user-context';

@Component({
  selector: 'app-home',
  imports: [HeroSection, SearchPanel, QuickAccess, RecentSearches, Footer, NewsTicker],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
