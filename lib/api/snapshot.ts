import { request, gql } from 'graphql-request';
import { Proposal, Vote } from '@/types';
import { API_ENDPOINTS } from '@/lib/constants';

const PROPOSALS_QUERY = gql`
  query Proposals($space: String!, $first: Int!, $skip: Int!, $state: String) {
    proposals(
      first: $first
      skip: $skip
      where: { space: $space, state: $state }
      orderBy: "created"
      orderDirection: desc
    ) {
      id
      title
      body
      choices
      start
      end
      snapshot
      state
      author
      space {
        id
        name
      }
      scores
      scores_total
      quorum
      votes
      link
    }
  }
`;

const VOTES_QUERY = gql`
  query Votes($proposalId: String!, $first: Int!, $skip: Int!) {
    votes(
      first: $first
      skip: $skip
      where: { proposal: $proposalId }
      orderBy: "created"
      orderDirection: desc
    ) {
      id
      voter
      choice
      vp
      created
    }
  }
`;

export async function fetchProposals(
  space: string,
  state?: 'active' | 'closed' | 'pending',
  first: number = 10,
  skip: number = 0
): Promise<Proposal[]> {
  try {
    const data: any = await request(API_ENDPOINTS.SNAPSHOT, PROPOSALS_QUERY, {
      space,
      first,
      skip,
      state,
    });
    return data.proposals || [];
  } catch (error) {
    console.error('Error fetching proposals:', error);
    return [];
  }
}

export async function fetchVotes(
  proposalId: string,
  first: number = 100,
  skip: number = 0
): Promise<Vote[]> {
  try {
    const data: any = await request(API_ENDPOINTS.SNAPSHOT, VOTES_QUERY, {
      proposalId,
      first,
      skip,
    });
    return data.votes || [];
  } catch (error) {
    console.error('Error fetching votes:', error);
    return [];
  }
}