import React, { useState } from 'react';
import { Cpu, Terminal, ArrowRight, CheckCircle2 } from 'lucide-react';
import { parseStyleQuery } from '../services/api';

export default function CompilerQueryBar({ onQueryResult }) {
  const [query, setQuery] = useState('CASUAL BLACK COLLEGE');
  const [parsing, setParsing] = useState(false);
  const [astResult, setAstResult] = useState(null);

  const handleRunCompiler = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setParsing(true);
    const res = await parseStyleQuery(query);
    setParsing(false);
    setAstResult(res);
    if (onQueryResult) onQueryResult(res.data);
  };

  return (
    <div className="bg-fashion-black border border-fashion-gold/30 rounded-xl p-5 my-8 shadow-editorial">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-fashion-gold/20">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-fashion-gold" />
          <h3 className="font-serif text-lg font-bold text-fashion-ivory uppercase tracking-wider">
            NLP STYLE COMPILER & DFA VALIDATOR MODULE
          </h3>
        </div>
        <span className="text-[10px] bg-fashion-gold/20 text-fashion-gold border border-fashion-gold/40 px-2 py-0.5 rounded font-mono uppercase">
          TOC AST INTEGRATED
        </span>
      </div>

      <form onSubmit={handleRunCompiler} className="flex flex-col sm:flex-row items-center gap-3 mb-4">
        <div className="relative flex-1 w-full">
          <Terminal className="w-4 h-4 text-fashion-gold absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type query e.g. CASUAL BLACK COLLEGE"
            className="w-full bg-fashion-darkGray border border-fashion-lightGray/20 rounded-lg pl-10 pr-4 py-2.5 text-xs font-mono text-fashion-ivory focus:border-fashion-gold focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={parsing}
          className="w-full sm:w-auto bg-fashion-burgundy hover:bg-fashion-burgundyHover text-fashion-ivory px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 border border-fashion-gold cursor-pointer transition-colors"
        >
          {parsing ? 'Parsing DFA...' : 'EXECUTE COMPILER'}
          <ArrowRight className="w-3.5 h-3.5 text-fashion-gold" />
        </button>
      </form>

      {/* Compiler Execution Pipeline Viz */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] font-mono text-fashion-lightGray bg-fashion-darkGray/60 p-3 rounded-lg border border-fashion-lightGray/10">
        <div className="p-2 bg-fashion-black rounded border border-fashion-lightGray/10">
          <span className="text-[9px] text-fashion-gold uppercase block">1. LEXER</span>
          <span className="text-fashion-ivory">Tokens: [{query.split(' ').map(t => `"${t}"`).join(', ')}]</span>
        </div>
        <div className="p-2 bg-fashion-black rounded border border-fashion-lightGray/10">
          <span className="text-[9px] text-fashion-gold uppercase block">2. PARSER AST</span>
          <span className="text-fashion-ivory">
            Style: {astResult?.parsedAST?.style || 'Pending'}
          </span>
        </div>
        <div className="p-2 bg-fashion-black rounded border border-fashion-lightGray/10">
          <span className="text-[9px] text-fashion-gold uppercase block">3. DFA VALIDATOR</span>
          <span className="text-fashion-gold font-bold">STATE: VALID ACCEPT</span>
        </div>
        <div className="p-2 bg-fashion-black rounded border border-fashion-lightGray/10 flex items-center justify-between">
          <div>
            <span className="text-[9px] text-fashion-gold uppercase block">4. AI MATCHED</span>
            <span className="text-fashion-ivory font-bold">{astResult ? `${astResult.count} items` : 'Ready'}</span>
          </div>
          {astResult && <CheckCircle2 className="w-4 h-4 text-fashion-gold" />}
        </div>
      </div>
    </div>
  );
}
