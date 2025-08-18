import React, { useState } from 'react';

const App = () => {
  const [activeSection, setActiveSection] = useState('dictionary');

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-900">Algebraic Geometry Study Guide</h1>
      
      <div className="flex mb-6 gap-2 flex-wrap justify-center">
        <NavButton 
          title="Algebra-Geometry Dictionary" 
          active={activeSection === 'dictionary'} 
          onClick={() => setActiveSection('dictionary')} 
        />
        <NavButton 
          title="Ideals & Varieties" 
          active={activeSection === 'ideals'} 
          onClick={() => setActiveSection('ideals')} 
        />
        <NavButton 
          title="Groebner Bases" 
          active={activeSection === 'groebner'} 
          onClick={() => setActiveSection('groebner')} 
        />
        <NavButton 
          title="Ring Homomorphisms" 
          active={activeSection === 'homomorphisms'} 
          onClick={() => setActiveSection('homomorphisms')} 
        />
        <NavButton 
          title="Nullstellensatz" 
          active={activeSection === 'nullstellensatz'} 
          onClick={() => setActiveSection('nullstellensatz')} 
        />
        <NavButton 
          title="Test Prep" 
          active={activeSection === 'test-prep'} 
          onClick={() => setActiveSection('test-prep')} 
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {activeSection === 'dictionary' && <AlgebraGeometryDictionary />}
        {activeSection === 'ideals' && <IdealsVarieties />}
        {activeSection === 'groebner' && <GroebnerBases />}
        {activeSection === 'homomorphisms' && <RingHomomorphisms />}
        {activeSection === 'nullstellensatz' && <Nullstellensatz />}
        {activeSection === 'test-prep' && <TestPrep />}
      </div>
    </div>
  );
};

const NavButton = ({ title, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg ${
        active 
          ? 'bg-indigo-700 text-white' 
          : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
      }`}
    >
      {title}
    </button>
  );
};

// Section components
const AlgebraGeometryDictionary = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">The Algebra-Geometry Dictionary</h2>
      
      <p className="mb-4">
        Algebraic geometry establishes a powerful correspondence between algebraic structures and geometric objects.
        This dictionary allows us to translate problems between algebra and geometry.
      </p>
      
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-indigo-100">
              <th className="border p-2 text-left">Algebra</th>
              <th className="border p-2 text-left">Geometry</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 bg-gray-50">Polynomial ring K[x1,...,xn]</td>
              <td className="border p-2">Affine space An</td>
            </tr>
            <tr>
              <td className="border p-2 bg-gray-50">Ideal I in K[x1,...,xn]</td>
              <td className="border p-2">Variety V(I) in An</td>
            </tr>
            <tr>
              <td className="border p-2 bg-gray-50">Radical ideal</td>
              <td className="border p-2">Variety</td>
            </tr>
            <tr>
              <td className="border p-2 bg-gray-50">Prime ideal</td>
              <td className="border p-2">Irreducible variety</td>
            </tr>
            <tr>
              <td className="border p-2 bg-gray-50">Maximal ideal</td>
              <td className="border p-2">Point</td>
            </tr>
            <tr>
              <td className="border p-2 bg-gray-50">K[x1,...,xn]/I</td>
              <td className="border p-2">Coordinate ring K[V]</td>
            </tr>
            <tr>
              <td className="border p-2 bg-gray-50">Function field K(V)</td>
              <td className="border p-2">Rational functions on V</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mb-2">Operations</h3>
      <div className="mb-4">
        <p className="mb-2">
          <strong>V:</strong> Maps an ideal I to the variety V(I), the set of all points where all polynomials in I vanish
        </p>
        <p className="mb-2">
          <strong>I:</strong> Maps a variety V to the ideal I(V), all polynomials that vanish on all points of V
        </p>
      </div>
      
      <h3 className="text-xl font-semibold mb-2">Important Relationships</h3>
      <ul className="list-disc pl-5 mb-4">
        <tr>
          <td className="p-2 bg-gray-50">I1 ∩ I2</td>
          <td className="p-2">V(I1) ∪ V(I2)</td>
        </tr>
        <tr>
          <td className="p-2 bg-gray-50">I1 + I2</td>
          <td className="p-2">V(I1) ∩ V(I2)</td>
        </tr>
      </ul>
      
      <h3 className="text-xl font-semibold mb-2">Hilbert's Nullstellensatz</h3>
      <p className="mb-2">
        <strong>Weak:</strong> If K is algebraically closed and I is a proper ideal, then V(I) is non-empty
      </p>
      <p>
        <strong>Strong:</strong> If K is algebraically closed, then I(V(I)) = √I (the radical of I)
      </p>
    </div>
  );
};

const IdealsVarieties = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Ideals and Varieties</h2>
      
      <h3 className="text-xl font-semibold mb-2">Ideals</h3>
      <p className="mb-4">
        An <strong>ideal</strong> I in a ring R is a non-empty subset that is:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>Closed under addition: If a, b in I, then a + b in I</li>
        <li>Absorbs products: If a in I and r in R, then ra in I</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-2">Types of Ideals</h3>
      <ul className="list-disc pl-5 mb-4">
        <li><strong>Principal ideal:</strong> Generated by a single element</li>
        <li><strong>Radical ideal:</strong> If a^n in I for some n, then a in I</li>
        <li><strong>Prime ideal:</strong> If ab in P, then a in P or b in P</li>
        <li><strong>Maximal ideal:</strong> Not contained in any ideal except the whole ring</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-2">Varieties</h3>
      <p className="mb-4">
        An <strong>affine variety</strong> is the set of common zeros of a collection of polynomials
      </p>
      
      <h3 className="text-xl font-semibold mb-2">Irreducible Varieties</h3>
      <p className="mb-2">
        A variety V is <strong>irreducible</strong> if it cannot be written as the union of two proper subvarieties
      </p>
      <p>
        A variety V is irreducible if and only if I(V) is a prime ideal
      </p>
    </div>
  );
};

const GroebnerBases = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Groebner Bases</h2>
      
      <h3 className="text-xl font-semibold mb-2">Monomial Orderings</h3>
      <p className="mb-4">
        A <strong>monomial ordering</strong> is a total order on monomials that:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>Is a well-ordering (every non-empty set has a smallest element)</li>
        <li>Respects multiplication (if u < v, then uw < vw for any monomial w)</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-2">Common Orderings</h3>
      <ul className="list-disc pl-5 mb-4">
        <li><strong>Lexicographic (lex):</strong> Compare powers of variables in order</li>
        <li><strong>Graded lexicographic (grlex):</strong> First compare total degree, then use lex</li>
        <li><strong>Graded reverse lexicographic (grevlex):</strong> First compare total degree, then in reverse order</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-2">Division Algorithm</h3>
      <p className="mb-4">
        Given a polynomial f and polynomials g1,...,gs, the division algorithm produces:
      </p>
      <p className="mb-2">
        f = q1g1 + ... + qsgs + r
      </p>
      <p className="mb-4">
        where r has no term divisible by any leading term of the gi
      </p>
      
      <h3 className="text-xl font-semibold mb-2">Groebner Basis Definition</h3>
      <p className="mb-4">
        A <strong>Groebner basis</strong> G = {g1,...,gt} for an ideal I is a set of polynomials such that
        the ideal of leading terms of I equals the ideal generated by the leading terms of the g's
      </p>
      
      <h3 className="text-xl font-semibold mb-2">Buchberger's Algorithm</h3>
      <p className="mb-2">
        For polynomials f, g we define the <strong>S-polynomial</strong> to eliminate leading terms
      </p>
      <p className="mb-4">
        A set G is a Groebner basis if and only if all S-polynomials reduce to 0 when divided by G
      </p>
      <p>
        Buchberger's algorithm computes a Groebner basis by adding S-polynomials that don't reduce to 0
      </p>
    </div>
  );
};

const RingHomomorphisms = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Ring Homomorphisms and Polynomial Maps</h2>
      
      <h3 className="text-xl font-semibold mb-2">Ring Homomorphisms</h3>
      <p className="mb-4">
        A <strong>ring homomorphism</strong> φ: R → S preserves:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>Addition: φ(a + b) = φ(a) + φ(b)</li>
        <li>Multiplication: φ(ab) = φ(a)φ(b)</li>
        <li>Identity: φ(1) = 1</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-2">Key Properties</h3>
      <ul className="list-disc pl-5 mb-4">
        <li>If φ has kernel K, then R/K ≅ im(φ) (First Isomorphism Theorem)</li>
        <li>The preimage of a radical/prime/maximal ideal is radical/prime</li>
        <li>If φ is surjective, the preimage of a maximal ideal is maximal</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-2">Polynomial Maps</h3>
      <p className="mb-4">
        A <strong>polynomial map</strong> F: V → W is given by polynomials f1,...,fn where F(p) = (f1(p),...,fn(p))
      </p>
      
      <h3 className="text-xl font-semibold mb-2">Correspondence with Ring Homomorphisms</h3>
      <p className="mb-4">
        A polynomial map F: V → W corresponds to a K-algebra homomorphism F*: K[W] → K[V]
      </p>
      <p className="mb-2">Important relationships:</p>
      <ul className="list-disc pl-5 mb-4">
        <li>If F*: K[W] → K[V] is surjective, then F: V → W is injective</li>
        <li>If F: V → W is surjective, then F*: K[W] → K[V] is injective</li>
      </ul>
    </div>
  );
};

const Nullstellensatz = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Hilbert's Nullstellensatz</h2>
      
      <h3 className="text-xl font-semibold mb-2">Weak Nullstellensatz</h3>
      <p className="mb-4">
        If K is algebraically closed and I is a proper ideal in K[x1,...,xn], then V(I) ≠ ∅
      </p>
      <p className="mb-4">
        In other words: Every proper ideal has at least one common zero
      </p>
      
      <h3 className="text-xl font-semibold mb-2">Strong Nullstellensatz</h3>
      <p className="mb-4">
        If K is algebraically closed, then for any ideal I in K[x1,...,xn]:
      </p>
      <p className="text-lg text-center font-bold mb-4">
        I(V(I)) = √I
      </p>
      <p className="mb-4">
        This establishes the one-to-one correspondence between varieties and radical ideals
      </p>
      
      <h3 className="text-xl font-semibold mb-2">Key Results Leading to the Nullstellensatz</h3>
      <ul className="list-disc pl-5 mb-4">
        <li>
          <strong>Zariski's Lemma:</strong> If L is a finitely-generated K-algebra that is also a field,
          then L is a finite algebraic extension of K
        </li>
        <li>
          <strong>Noether Normalization:</strong> If A is a finitely-generated K-algebra, 
          there exists an algebraically independent subset of A such that A is integral over 
          the polynomial ring in those elements
        </li>
      </ul>
    </div>
  );
};

const TestPrep = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Test Prep Topics</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Chinese Remainder Theorem and Comaximal Ideals</h3>
        <p className="mb-2">
          Two ideals I, J are <strong>comaximal</strong> when I+J = ⟨1⟩
        </p>
        <ul className="list-disc pl-5 mb-2">
          <li>A maximal ideal M is comaximal with I if and only if I is not contained in M</li>
          <li>In Z, ideals ⟨a⟩ and ⟨b⟩ are comaximal iff gcd(a,b) = 1</li>
          <li>If I, J are comaximal, then V(I) ∩ V(J) = ∅</li>
        </ul>
        <div className="bg-indigo-50 p-3 rounded mb-2">
          <p className="font-semibold">Chinese Remainder Theorem:</p>
          <p>If I, J are comaximal, R/I∩J ≅ R/I × R/J</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Quotient Ideals</h3>
        <p className="mb-2">
          The <strong>ideal quotient</strong> I:J = {r in R : rJ ⊆ I}
        </p>
        <ul className="list-disc pl-5 mb-2">
          <li>I:J ⊇ I for any ideals I and J</li>
          <li>If Q is radical, then Q:J is also radical</li>
          <li>If P is prime, P:J is either P or the entire ring R</li>
          <li>V(I:J) contains V(I)∖V(J)</li>
        </ul>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Irreducible Decomposition</h3>
        <p className="mb-2">
          A variety V is <strong>reducible</strong> when V = V1 ∪ V2 with V1, V2 proper subvarieties
        </p>
        <ul className="list-disc pl-5 mb-2">
          <li>V is irreducible if and only if I(V) is prime</li>
          <li>Any variety can be written as a finite union of irreducible varieties</li>
        </ul>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Multivariate Division and Groebner Bases</h3>
        <p className="mb-2">
          The multivariate division algorithm allows us to compute remainders when dividing by multiple polynomials
        </p>
        <p className="mb-2">
          A Groebner basis G = {g1,...,gs} for an ideal I allows us to:
        </p>
        <ol className="list-decimal pl-5 mb-2">
          <li>Determine if a polynomial is in I (remainder is 0)</li>
          <li>Find a basis for K[x1,...,xn]/I</li>
          <li>Compute in the quotient ring K[x1,...,xn]/I</li>
        </ol>
      </div>
    </div>
  );
};

export default App;