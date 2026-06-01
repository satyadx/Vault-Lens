/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());

  // Let's configure a health endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // Robust Programmatic Dynamic Fallback Recommendation Engine
  function generateFallbackResponse(
    investmentAmount: number,
    riskLevel: string,
    preferredChain: string,
    investmentStyle: string,
    customPrompt?: string,
    isErrorMode: boolean = false
  ) {
    const candidates = [
      {
        id: "concrete-stable",
        name: "Concrete DeFi USDT",
        apy: 8.4,
        risk: "Low",
        style: "Passive",
        chain: "Concrete Core Network",
        score: 98,
        title: "Concrete DeFi USDT: Sovereign Equilibrium Match",
        analysis: "Based on your preferences, the smart engine recommends Concrete DeFi USDT. It provides the highest stability index (98/100) and shields capital from high gas fees while automating compound cycles.",
        metrics: {
          operationalStress: "None. Automated protection layers run continuously.",
          gasUsage: "Batch-optimized. Consumes up to 92% less gas than standard.",
          stableYield: "Sustainable ~8.4% APY backed by Concrete infrastructure.",
          managementDifficulty: "Pure Set-and-Forget."
        }
      },
      {
        id: "weeth-vault",
        name: "WeETH Vault",
        apy: 6.2,
        risk: "Moderate",
        style: "Balanced",
        chain: "Ethereum Mainnet",
        score: 92,
        title: "WeETH Vault: Institutional Grade Ether Staking",
        analysis: "A balanced approach is best satisfied by the WeETH Vault with ether staking protection metrics. It pairs steady compound yields with moderate operational stress.",
        metrics: {
          operationalStress: "Moderate. Requires periodic re-staking evaluations.",
          gasUsage: "Standard gas routing. Optimizations are active but depend on Ethereum mainnet congestion.",
          stableYield: "Steady yields backed by institutional restaking protocols.",
          managementDifficulty: "Low maintenance. Restake annually."
        }
      },
      {
        id: "wbtc-vault",
        name: "WBTC Vault",
        apy: 5.1,
        risk: "Low",
        style: "Passive",
        chain: "Bitcoin Wrapping Layer",
        score: 90,
        title: "WBTC Vault: Premium Bitcoin Accumulator",
        analysis: "Long-term Bitcoin exposure with single-sided security buffers. Your capital gains solid passive yield without active transaction overhead.",
        metrics: {
          operationalStress: "Minimal. Designed for long-term BTC holders.",
          gasUsage: "Optimized. Few on-chain transactions required.",
          stableYield: "Low-variability passive BTC compounding.",
          managementDifficulty: "Set-and-Forget."
        }
      },
      {
        id: "frxusd",
        name: "frxUSD+",
        apy: 9.5,
        risk: "Moderate",
        style: "Passive",
        chain: "Frax Chain",
        score: 88,
        title: "frxUSD+: Calibrated Fractional Aggregator",
        analysis: "Stable yield layer aggregator maximizing fractional reserve liquidity rewards with safe baseline protective parameters.",
        metrics: {
          operationalStress: "Low. Algorithmic balance handled by smart contracts.",
          gasUsage: "Highly cost-effective on Frax Chain sub-networks.",
          stableYield: "Stable rate from fractional lending pools.",
          managementDifficulty: "Minimal, passive yield aggregation."
        }
      },
      {
        id: "katana-ausd",
        name: "Katana AUSD",
        apy: 21.4,
        risk: "High",
        style: "Aggressive",
        chain: "Katana Protocol",
        score: 85,
        title: "Katana AUSD: High Yield Leveraged Vector",
        analysis: "For aggressive growth target, Katana AUSD is suggested. Note that operational stress is significant. Keep leverage thresholds monitored.",
        metrics: {
          operationalStress: "High. Demands monitoring of collateral thresholds.",
          gasUsage: "Unoptimized. Direct smart contract transactions.",
          stableYield: "Volatile yield with reward-token inflation.",
          managementDifficulty: "Active rebalancing required."
        }
      },
      {
        id: "berachain-bera",
        name: "Berachain BERA",
        apy: 34.2,
        risk: "High",
        style: "Aggressive",
        chain: "Berachain Core Testnet",
        score: 80,
        title: "Berachain BERA: Active Proof-of-Liquidity Index",
        analysis: "Extreme growth profile. Leverages Berachain proof of liquidity loops, requiring high attention and monitoring of systemic volatility peaks.",
        metrics: {
          operationalStress: "Maximum stress level. Requires continuous risk assessment.",
          gasUsage: "Highly volatile and reactive gas consumption.",
          stableYield: "Extremely variable, based on token emissions.",
          managementDifficulty: "Active professional grade optimization."
        }
      }
    ];

    // Find the candidate that best matches the active inputs
    let selectedBest = candidates[0];
    let maxMatchedValue = -100;

    for (const c of candidates) {
      let currentVal = 100;
      
      // Mismatch risk level penalty
      if (riskLevel !== "All" && riskLevel !== c.risk) {
        currentVal -= 45;
      }
      
      // Mismatch investment style penalty
      if (investmentStyle !== "All" && investmentStyle !== c.style) {
        currentVal -= 45;
      }

      // Chain match evaluation
      if (preferredChain !== "All Chains") {
        const pChainLower = preferredChain.toLowerCase();
        const cChainLower = c.chain.toLowerCase();
        if (!cChainLower.includes(pChainLower) && !(pChainLower === "concrete core" && c.id === "concrete-stable")) {
          currentVal -= 30;
        }
      }

      if (currentVal > maxMatchedValue) {
        maxMatchedValue = currentVal;
        selectedBest = c;
      }
    }

    // Set custom analysis response text
    let finalAnalysis = selectedBest.analysis;
    const capitalPrefix = `Allocating $${(investmentAmount || 50000).toLocaleString()} Capital on ${selectedBest.chain}`;

    if (customPrompt) {
      const promptLower = customPrompt.toLowerCase();
      if (promptLower.includes("stable") || promptLower.includes("usdt") || promptLower.includes("safety") || promptLower.includes("risk")) {
        finalAnalysis = `${capitalPrefix}: Concrete DeFi stable mechanics prioritize structural depeg safety. This blocks flash loan exploits and volatility.`;
      } else if (promptLower.includes("gas") || promptLower.includes("fee") || promptLower.includes("cost") || promptLower.includes("congest")) {
        finalAnalysis = `${capitalPrefix}: Gas optimizations with batch operations cut network fees by 92%, saving up to $150 in transaction fees.`;
      } else if (promptLower.includes("lever") || promptLower.includes("high") || promptLower.includes("apy") || promptLower.includes("katana") || promptLower.includes("bera")) {
        finalAnalysis = `${capitalPrefix}: Yield maximization structures require live margin monitoring. We recommend balancing with a Concrete stable buffer.`;
      } else {
        finalAnalysis = `${capitalPrefix}: Strategy review evaluated "${customPrompt.substring(0, 45)}...". We advise holding ${selectedBest.name} to minimize risk.`;
      }
    }

    if (isErrorMode) {
      finalAnalysis += " (AI Server high demand; system defaulted to local match analyzer)";
    } else if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
      finalAnalysis += " (Gemini sandbox mode; local analyzer active)";
    }

    return {
      recommendedVaultId: selectedBest.id,
      vaultName: selectedBest.name,
      matchScore: Math.max(50, Math.min(100, 100 - Math.abs(maxMatchedValue - 100))),
      title: selectedBest.title,
      customAnalysis: finalAnalysis,
      metrics: selectedBest.metrics,
      fallbackMode: true
    };
  }

  // Secure API endpoint for smart vault advising
  app.post("/api/recommend", async (req, res) => {
    const { investmentAmount, riskLevel, preferredChain, investmentStyle, customPrompt } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      console.log("GEMINI_API_KEY is not configured or holds a placeholder. Using intelligent fallback engine.");
      const fallbackResult = generateFallbackResponse(
        Number(investmentAmount),
        riskLevel,
        preferredChain,
        investmentStyle,
        customPrompt,
        false
      );
      return res.json(fallbackResult);
    }

    try {
      // Lazy initialization of the SDK as required by guidelines
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build', // Mandatory telemetry header
          }
        }
      });

      const userContextStr = `
        Investment Amount: $${investmentAmount} USD
        Risk Preference: ${riskLevel}
        Preferred Chain: ${preferredChain}
        Investment Style: ${investmentStyle}
        ${customPrompt ? `User Specific Strategy Question: "${customPrompt}"` : ""}
      `;

      const systemInstruction = `You are the chief AI Analyst/Advisor for Vault Lens, a premium futuristic Web3 DeFi comparison engine inspired by the Concrete ecosystem.
Your mandate is to determine the absolute match among the candidate vaults for the user's specific context, and return a tailored professional review.

DeFi Candidate Vaults:
1. 'concrete-stable' (Name: Concrete DeFi USDT, APY: 8.4%, Low Risk, Style: Passive, Chain: Concrete Core Network). Highlighted as the ideal option for calm investing.
2. 'weeth-vault' (Name: WeETH Vault, APY: 6.2%, Moderate Risk, Style: Balanced, Chain: Ethereum Mainnet). Ethereum staking yield.
3. 'wbtc-vault' (Name: WBTC Vault, APY: 5.1%, Low Risk, Style: Passive, Chain: Bitcoin Wrapping Layer). Long-term BTC exposure.
4. 'frxusd' (Name: frxUSD+, APY: 9.5%, Moderate Risk, Style: Passive, Chain: Frax Chain). Stable yield layer with moderate passive income.
5. 'katana-ausd' (Name: Katana AUSD, APY: 21.4%, High Risk, Style: Aggressive, Chain: Katana Protocol). High risk algorithmic US dollar yield mining strategy.
6. 'berachain-bera' (Name: Berachain BERA, APY: 34.2%, High Risk, Style: Aggressive, Chain: Berachain Core Testnet). Extreme volatility / active monitoring required.

Selection Priorities:
- If the user prefers Low Risk, Passive style, or values gas efficiency and stability, recommend 'concrete-stable'. Frame it as the institutional-grade, low-stress premium standard.
- Give highly technical details in the 'customAnalysis' paragraph about how their amount of $${investmentAmount} behaves in high-gas or low-gas scenarios, and how the Concrete ecosystem's structural calm outperforms hyper-active trading.
- If a 'User Specific Strategy Question' is supplied, your 'customAnalysis' paragraph MUST directly address the user's specific question while grounding the answer inside the candidate vaults' metrics and structure. Keep it highly relevant, technical, and helpful.
- Keep the tone elite, professional, clear, and grounded. No marketing fluff or meme speak.

Return EXACTLY a JSON matching this structure:
{
  "recommendedVaultId": "concrete-stable" | "weeth-vault" | "wbtc-vault" | "frxusd" | "katana-ausd" | "berachain-bera",
  "vaultName": "The formal name of the vault",
  "matchScore": integer (0 to 100 representing how well it fits),
  "title": "A concise title summarizing the advisor's verdict",
  "customAnalysis": "A 3-4 sentence detailed investment analysis tailor-fit to their amount and chosen style.",
  "metrics": {
    "operationalStress": "One short sentence about human interaction required",
    "gasUsage": "One short sentence describing Gas efficiency and fee savings",
    "stableYield": "One short sentence reflecting safety and consistency of APY",
    "managementDifficulty": "e.g., 'Fully automated portfolio', 'High direct friction'"
  }
}`;

      let response;
      try {
        console.log("Querying primary model (gemini-3.5-flash)...");
        response = await ai.models.generateContent({
          model: "gemini-3.5-flash", // Primary Basic Text task model
          contents: `Recommend the best DeFi vault for this user setup:\n${userContextStr}`,
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                recommendedVaultId: { type: Type.STRING },
                vaultName: { type: Type.STRING },
                matchScore: { type: Type.INTEGER },
                title: { type: Type.STRING },
                customAnalysis: { type: Type.STRING },
                metrics: {
                  type: Type.OBJECT,
                  properties: {
                    operationalStress: { type: Type.STRING },
                    gasUsage: { type: Type.STRING },
                    stableYield: { type: Type.STRING },
                    managementDifficulty: { type: Type.STRING },
                  },
                  required: ["operationalStress", "gasUsage", "stableYield", "managementDifficulty"]
                }
              },
              required: ["recommendedVaultId", "vaultName", "matchScore", "title", "customAnalysis", "metrics"]
            }
          }
        });
      } catch (primaryError: any) {
        console.warn(`Primary model gemini-3.5-flash failed with message: ${primaryError.message || primaryError}. Esculating to fallback model (gemini-flash-latest)...`);
        response = await ai.models.generateContent({
          model: "gemini-flash-latest", // Fallback model alias
          contents: `Recommend the best DeFi vault for this user setup:\n${userContextStr}`,
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                recommendedVaultId: { type: Type.STRING },
                vaultName: { type: Type.STRING },
                matchScore: { type: Type.INTEGER },
                title: { type: Type.STRING },
                customAnalysis: { type: Type.STRING },
                metrics: {
                  type: Type.OBJECT,
                  properties: {
                    operationalStress: { type: Type.STRING },
                    gasUsage: { type: Type.STRING },
                    stableYield: { type: Type.STRING },
                    managementDifficulty: { type: Type.STRING },
                  },
                  required: ["operationalStress", "gasUsage", "stableYield", "managementDifficulty"]
                }
              },
              required: ["recommendedVaultId", "vaultName", "matchScore", "title", "customAnalysis", "metrics"]
            }
          }
        });
      }

      const responseText = response.text || "";
      const recommendationData = JSON.parse(responseText.trim());
      res.json(recommendationData);

    } catch (error: any) {
      console.warn("Gemini API encountered high demand or connection limitations. Activating local advisor engine fallback:", error.message || error);
      const fallbackResult = generateFallbackResponse(
        Number(investmentAmount),
        riskLevel,
        preferredChain,
        investmentStyle,
        customPrompt,
        true
      );
      res.json(fallbackResult);
    }
  });

  // Setup Vite middleware for development or Serve static directory in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Vault Lens server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
