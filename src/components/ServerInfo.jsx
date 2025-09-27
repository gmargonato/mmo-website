import { useState, useEffect } from 'react';
import { ClientDownloadLink } from '../constants';
import ImagePreviewDialog from './dialogs/ImagePreviewDialog';
import { supabase } from '../lib/supabase';

function ServerInfo({ onContentChange }) {
  const [currentMonster, setCurrentMonster] = useState('');
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [playerCount, setPlayerCount] = useState(0);

  const fetchPlayerCount = async () => {
    try {
      const { count, error } = await supabase
        .from('players')
        .select('*', { count: 'exact', head: true })
        // .eq('access', 0)
        // .eq('server', 'New');
      
      if (error) throw error;
      setPlayerCount(count || 0);
    } catch (error) {
      console.error('Error fetching player count:', error);
      setPlayerCount(0);
    }
  };

  useEffect(() => {
    // Set random monster
    const monsters = ['achad', 'amazons', 'ancientscarab', 'assassin', 'azurefrog', 'badger', 'bandit', 'banshee', 'barbarian_bloodwalker', 'barbarian_brutetamer', 'barbarian_headsplitter', 'barbarian_skullhunter', 'bat', 'bear', 'behemoth', 'beholder', 'betrayedwraith', 'blackknight', 'blightwalker', 'bloodcrab', 'bluedjinn', 'bog_raider', 'bonebeast', 'braindeath', 'bug', 'carniphila', 'carrionworm', 'caverat', 'centipede', 'chakoya_toolshaper', 'chakoya_tribewarden', 'chakoya_windcaller', 'cobra', 'colerian_the_barbarian', 'coralfrog', 'crab', 'crimsonfrog', 'crocodile', 'cryptshambler', 'crystal_spider', 'cultacolyte', 'cultadept', 'cultpriest', 'cyclops', 'cyclops_drone', 'cyclops_smith', 'darakan_the_executioner', 'dark_apprentice', 'dark_magician', 'dark_torturer', 'darkmonk', 'deadeye', 'defiler', 'demon', 'demonskeleton', 'destroyer', 'dharalion', 'diabolic_imp', 'dragon', 'dragon_hatchling', 'dragon_lord_hatchling', 'dragonlord', 'dryad', 'dwarf', 'dwarf_henchman', 'dwarf_miner', 'dwarfgeomancer', 'dwarfguard', 'dwarfsoldier', 'dworcfleshhunter', 'dworcvenomsniper', 'dworcvoodoomaster', 'earth_elemental', 'efreet', 'elderbeholder', 'elephant', 'elf', 'elfarcanist', 'elfscout', 'energy_elemental', 'farao1', 'farao2', 'fernfang', 'ferumbras', 'fire_elemental', 'firedevil', 'frost_dragon', 'frost_dragon_hatchling', 'frost_giant', 'frost_troll', 'fury', 'gargoyle', 'gazer', 'generalmurius', 'ghazbaran', 'ghost', 'ghoul', 'giantspider', 'gnorre_chyllson', 'goblin', 'goblin_assassin', 'goblin_scavenger', 'greendjinn', 'grim_reaper', 'grorlam', 'hand_of_cursed_fate', 'hellfire_fighter', 'hellhound', 'hero', 'hunter', 'hyaena', 'hydra', 'ice_golem', 'ice_witch', 'island_troll', 'juggernaut', 'kongra', 'larva', 'lich', 'lion', 'lizardsentinel', 'lizardsnakecharmer', 'lizardtemplar', 'lost_soul', 'mammoth', 'man_in_the_cave', 'marid', 'massive_earth_elemental', 'massive_energy_elemental', 'massive_water_elemental', 'merlkin', 'minoarcher', 'minoguard', 'minomage', 'minotaur', 'monk', 'morgaroth', 'mummy', 'necromancer', 'nightmare', 'nomad', 'noviceofthecult', 'orc', 'orcberserker', 'orchidfrog', 'orcleader', 'orcrider', 'orcshaman', 'orcspearman', 'orcwarlord', 'orcwarrior', 'orshabaal', 'panda', 'penguin', 'phantasm', 'piratebuccaneer', 'piratecorsair', 'piratecutthroat', 'pirateghost', 'piratemarauder', 'pirateskeleton', 'plaguesmith', 'poacher', 'poisonspider', 'polarbear', 'priestess', 'primitive', 'quaraconstrictor', 'quarahydromancer', 'quaramantassin', 'quarapincher', 'quarapredator', 'rat', 'roaring_water_elemental', 'rotworm', 'rotworm_queen', 'scarab', 'scorpion', 'sea_serpent', 'serpentspawn', 'sibang', 'sir_valorcrest', 'skeleton', 'skeleton_warrior', 'skunk', 'slick_water_elemental', 'slime', 'smuggler', 'snake', 'spectre', 'spider', 'spirit_of_fire', 'spitnettle', 'stalker', 'stonegolem', 'svoren_the_mad', 'swamp_troll', 'tarantula', 'terrorbird', 'the_count', 'the_hag', 'theevileye', 'thehornedfox', 'thelethallissy', 'theoldwidow', 'therontheripper', 'thetiquandasrevenge', 'thief', 'thornbacktortoise', 'thul', 'tiger', 'toad', 'tortoise', 'troll', 'troll_champion', 'undead_dragon', 'undead_jester', 'valkyrie', 'vampires', 'warlock', 'warwolf', 'wasp', 'waterelemental', 'wildwarrior', 'winter_wolf', 'wisp', 'witch', 'wolf', 'wyrm', 'wyvern', 'yeti', 'zarabustor'];
    const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];
    setCurrentMonster(`/monsters/${randomMonster}.gif`);

    // Fetch player count
    fetchPlayerCount();
  }, []);

  return (
    <aside className="p-4 w-46 mx-auto">

      {/* Pedestal */}
      <div className="mt-20">

        {/* Monsters */}
        <div className="relative z-10">
          {currentMonster && (
            <img 
              src={currentMonster} 
              alt="Random Monster" 
              className="w-14 h-14 object-contain mx-auto mb-[-30px] ml-[35px] relative z-20"
            />
          )}
          <img src="ui/pedestal.gif" className="w-auto left-[10%] relative z-10" alt="Pedestal"/>
          {/* Number of players in the database */}
          <p className="text-yellow-400 text-[10px] text-center bg-black h-6 w-28 ml-8 -mt-10" style={{lineHeight: '1', paddingTop: '1px'}}>{playerCount}<br/>Jogadores</p>
        </div>
        
        <div className="cursor-pointer">
          <img 
            src="ui/box-free.png" 
            className="w-auto mt-1.5 relative z-[5] hover:brightness-110" 
            onClick={() => setShowImagePreview(true)}
            alt="Free Server"
          />
          <img 
            src="ui/box-premium.gif" 
            className="w-auto mt-5 cursor-pointer hover:brightness-110" 
            onClick={() => onContentChange && onContentChange('shop')}
            alt="Premium Shop"
          />
          {/* <img src="/box-whatsapp.png" className="w-auto mt-5" onClick={() => { window.open('https://chat.whatsapp.com/ET23s3FEpBnHVtzYQruR5l', '_blank') }}/>
          <img src="/box-discord.png" className="w-auto mt-5" onClick={() => { window.open('https://discord.com/invite/UcMb8TFT5v', '_blank') }}/> */}
        </div>
      </div>

      {/* Image Preview Dialog */}
      <ImagePreviewDialog
        isOpen={showImagePreview}
        onClose={() => setShowImagePreview(false)}
        imageSrc="assets/newcomer.png"
        imageAlt="Newcomer"
      />

    </aside>
  )
}

export default ServerInfo
