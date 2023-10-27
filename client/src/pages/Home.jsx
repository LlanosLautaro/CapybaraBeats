import styled from 'styled-components';
import { v } from '../styles/Variables';
import { playlists,songs } from '../assets/data';


const HomeContainer = styled.div`
  background: ${v.bg};
  color: ${v.text};
  padding: 20px;
  min-height: 100vh;
`;

const RecommendationSection = styled.section`
  margin-top: 20px;
`;

const RecommendationTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
`;

const RecommendationList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const RecommendationItem = styled.div`
  background: ${v.bg2};
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const RecommendationItemTitle = styled.h3`
  font-size: 18px;
  margin: 0;
  margin-bottom: 8px;
`;

const RecommendationItemDescription = styled.p`
  font-size: 14px;
  color: ${v.text2};
  margin: 0;
`;
const RecommendationItemImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 8px;
`;
export const Home = () => {
  return (
    <HomeContainer>
      <h1>Escucha tus canciones favoritas</h1>

      <RecommendationSection>
        <RecommendationTitle>Canciones Recomendadas</RecommendationTitle>
        <RecommendationList>
          {songs.map((song) => (
            <RecommendationItem key={song.id}>
              <RecommendationItemImage src={song.imageUrl} alt={song.title} />
              <RecommendationItemTitle>{song.title}</RecommendationItemTitle>
              <RecommendationItemDescription>{song.artist}</RecommendationItemDescription>
            </RecommendationItem>
          ))}
        </RecommendationList>
      </RecommendationSection>

      <RecommendationSection>
        <RecommendationTitle>Listas de Reproducción Recomendadas</RecommendationTitle>
        <RecommendationList>
          {playlists.map((playlist) => (
            <RecommendationItem key={playlist.id}>
              <RecommendationItemImage src={playlist.imageUrl} alt={playlist.name} />
              <RecommendationItemTitle>{playlist.name}</RecommendationItemTitle>
              <RecommendationItemDescription>{playlist.description}</RecommendationItemDescription>
            </RecommendationItem>
          ))}
        </RecommendationList>
      </RecommendationSection>
    </HomeContainer>
  );
};