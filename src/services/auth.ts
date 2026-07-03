

// Simulated database of users so the app works purely on the frontend (Netlify friendly)
const MOCK_USERS = [
  {
    "id": "ingaleaditya652@gmail.com",
    "password": "TH-CH-001"
  },
  {
    "id": "shravaninagzare3@gmail.com",
    "password": "TH-CH-002"
  },
  {
    "id": "chorghadeawdhesh@gmail.com",
    "password": "TH-CH-003"
  },
  {
    "id": "aarohi.fulzele@cumminscollege.edu.in",
    "password": "TH-CH-004"
  },
  {
    "id": "kartikkatre25@gmail.com",
    "password": "TH-CH-005"
  },
  {
    "id": "om.gohokar.cyber@gmail.com",
    "password": "TH-CH-006"
  },
  {
    "id": "aryaadgurwar@gmail.com",
    "password": "TH-CH-007"
  },
  {
    "id": "namratadhawale16@gmail.com",
    "password": "TH-CH-008"
  },
  {
    "id": "gaikwadvidhi23@gmail.com",
    "password": "TH-CH-009"
  },
  {
    "id": "bisenaashmi196@gmail.com",
    "password": "TH-CH-010"
  },
  {
    "id": "aniketdhawle13@gmail.com",
    "password": "TH-CH-011"
  },
  {
    "id": "sonalbramhankar07@gmail.com",
    "password": "TH-CH-012"
  },
  {
    "id": "meetmuktachaturvedi10@gmail.com",
    "password": "TH-CH-013"
  },
  {
    "id": "yash567pisudde@gmail.com",
    "password": "TH-CH-014"
  },
  {
    "id": "janhvioroliya25@gmail.com",
    "password": "TH-CH-015"
  },
  {
    "id": "ashleshathakare29@gmail.com",
    "password": "TH-CH-016"
  },
  {
    "id": "krupakailaswar23@gmail.com",
    "password": "TH-CH-017"
  },
  {
    "id": "parthshahane4469@gmail.com",
    "password": "TH-CH-018"
  },
  {
    "id": "purvadaware31@gmail.com",
    "password": "TH-CH-019"
  },
  {
    "id": "adawadkargauri@gmail.com",
    "password": "TH-CH-020"
  },
  {
    "id": "rudranigedam24@gmail.com",
    "password": "TH-CH-021"
  },
  {
    "id": "krushnaimhaske1705@gmail.com",
    "password": "TH-CH-022"
  },
  {
    "id": "rpradnya26@gmail.com",
    "password": "TH-CH-023"
  },
  {
    "id": "janhavizanjal67@gmail.com",
    "password": "TH-CH-024"
  },
  {
    "id": "pranayjadhao19@gmail.com",
    "password": "TH-CH-025"
  },
  {
    "id": "pajankarsharwari@gmail.com",
    "password": "TH-CH-026"
  },
  {
    "id": "singhdeepansh235@gmail.com",
    "password": "TH-CH-027"
  },
  {
    "id": "vairagadeshravani@gmail.com",
    "password": "TH-CH-028"
  },
  {
    "id": "omkarawaze1915@gmail.com",
    "password": "TH-CH-029"
  },
  {
    "id": "shrawanchandore541@gmail.com",
    "password": "TH-CH-030"
  },
  {
    "id": "skillsfalguni.katekar@gmail.com",
    "password": "TH-CH-031"
  },
  {
    "id": "aman2006nik@gmail.com",
    "password": "TH-CH-032"
  },
  {
    "id": "rajnandani.jadhav@cumminscollege.edu.in",
    "password": "TH-CH-033"
  },
  {
    "id": "anoymus.stoic@gmail.com",
    "password": "TH-CH-034"
  },
  {
    "id": "emperorzeroamv@gmail.com",
    "password": "TH-CH-035"
  },
  {
    "id": "kr2932429@gmail.com",
    "password": "TH-CH-036"
  },
  {
    "id": "palchiku99@gmail.com",
    "password": "TH-CH-037"
  },
  {
    "id": "gayatrihanwate45@gmail.com",
    "password": "TH-CH-038"
  },
  {
    "id": "khanadibakhan0@gmail.com",
    "password": "TH-CH-039"
  },
  {
    "id": "hassu3210@gmail.com",
    "password": "TH-CH-040"
  },
  {
    "id": "manoramahedaoo64@gmail.com",
    "password": "TH-CH-041"
  },
  {
    "id": "kartikeypatle07@gmail.com",
    "password": "TH-CH-042"
  },
  {
    "id": "nirmohi.parate@cumminscollege.edu.in",
    "password": "TH-CH-043"
  },
  {
    "id": "tembhareshikhar47@gmail.com",
    "password": "TH-CH-044"
  },
  {
    "id": "kukdeayushi9818@gmail.com",
    "password": "TH-CH-045"
  },
  {
    "id": "rachanamakwana204@gmail.com",
    "password": "TH-CH-046"
  },
  {
    "id": "bhaskarrahangdale32@gmail.com",
    "password": "TH-CH-047"
  },
  {
    "id": "lonarearhanta@gmail.com",
    "password": "TH-CH-048"
  },
  {
    "id": "humanepranay8@gmail.com",
    "password": "TH-CH-049"
  },
  {
    "id": "test@example.com",
    "password": "password123"
  }
];

export async function authenticateAgent(agentId: string, accessKey: string): Promise<any> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const user = MOCK_USERS.find(u => 
    u.id.toLowerCase() === agentId.trim().toLowerCase() && u.password === accessKey
  );

  if (user) {
    // Return a fake token and the user object
    return {
      success: true,
      token: "fake-jwt-token-for-netlify-demo",
      user: { id: user.id },
      message: 'AUTHENTICATION SUCCESSFUL'
    };
  } else {
    throw new Error('Invalid agent ID or access key');
  }
}

export async function terminateSession(): Promise<void> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));
  return Promise.resolve();
}

export async function verifyActiveSession(): Promise<any> {
  return Promise.resolve(undefined);
}
