import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,f as n,o as l}from"./app-dX-INNG3.js";const e="/vuepress-starter/assets/141546169028846-BH452ydW.png",t={};function h(p,s){return l(),a("div",null,s[0]||(s[0]=[n('<h1 id="策略者模式-stragety-pattern" tabindex="-1"><a class="header-anchor" href="#策略者模式-stragety-pattern"><span><a href="https://www.cnblogs.com/zhili/p/StragetyPattern.html" target="_blank" rel="noopener noreferrer">策略者模式（Stragety Pattern）</a></span></a></h1><h1 id="一、引言" tabindex="-1"><a class="header-anchor" href="#一、引言"><span>一、引言</span></a></h1><p>前面主题介绍的状态模式是对某个对象状态的抽象，而本文要介绍的策略模式也就是对策略进行抽象，策略的意思就是方法，所以也就是对方法的抽象，下面具体分享下我对策略模式的理解。</p><h1 id="二、策略者模式介绍" tabindex="-1"><a class="header-anchor" href="#二、策略者模式介绍"><span>二、策略者模式介绍</span></a></h1><h2 id="_2-1-策略模式的定义" tabindex="-1"><a class="header-anchor" href="#_2-1-策略模式的定义"><span>2.1 策略模式的定义</span></a></h2><p>在现实生活中，策略模式的例子也非常常见，例如，中国的所得税，分为企业所得税、外商投资企业或外商企业所得税和个人所得税，针对于这3种所得税，针对每种，所计算的方式不同，个人所得税有个人所得税的计算方式，而企业所得税有其对应计算方式。如果不采用策略模式来实现这样一个需求的话，可能我们会定义一个所得税类，该类有一个属性来标识所得税的类型，并且有一个计算税收的CalculateTax()方法，在该方法体内需要对税收类型进行判断，通过if-else语句来针对不同的税收类型来计算其所得税。这样的实现确实可以解决这个场景，但是这样的设计不利于扩展，如果系统后期需要增加一种所得税时，此时不得不回去修改CalculateTax方法来多添加一个判断语句，这样明白违背了“开放——封闭”原则。此时，我们可以考虑使用策略模式来解决这个问题，既然税收方法是这个场景中的变化部分，此时自然可以想到对税收方法进行抽象。具体的实现代码见2.3部分。</p><p>前面介绍了策略模式用来解决的问题，下面具体给出策略的定义。策略模式是针对一组算法，将每个算法封装到具有公共接口的独立的类中，从而使它们可以相互替换。策略模式使得算法可以在不影响到客户端的情况下发生变化。</p><h2 id="_2-2-策略模式的结构" tabindex="-1"><a class="header-anchor" href="#_2-2-策略模式的结构"><span>2.2 策略模式的结构</span></a></h2><p>策略模式是对算法的包装，是把使用算法的责任和算法本身分割开，委派给不同的对象负责。策略模式通常把一系列的算法包装到一系列的策略类里面。用一句话慨括策略模式就是——“将每个算法封装到不同的策略类中，使得它们可以互换”。</p><p>下面是策略模式的结构图：</p><figure><img src="'+e+`" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>该模式涉及到三个角色：</p><ul><li>环境角色（Context）：持有一个Strategy类的引用</li><li>抽象策略角色（Strategy）：这是一个抽象角色，通常由一个接口或抽象类来实现。此角色给出所有具体策略类所需实现的接口。</li><li>具体策略角色（ConcreteStrategy）：包装了相关算法或行为。</li></ul><h2 id="_2-3-策略模式的实现" tabindex="-1"><a class="header-anchor" href="#_2-3-策略模式的实现"><span>2.3 策略模式的实现</span></a></h2><p>下面就以所得税的例子来实现下策略模式，具体实现代码如下所示：</p><div class="language-c# line-numbers-mode" data-highlighter="shiki" data-ext="c#" data-title="c#" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">namespace</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> StrategyPattern</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // 所得税计算策略</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> interface</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> ITaxStragety</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        double</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> CalculateTax</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">double</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> income</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // 个人所得税</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> PersonalTaxStrategy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> : </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">ITaxStragety</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> double</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> CalculateTax</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">double</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> income</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">            return</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> income</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> *</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0.12</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // 企业所得税</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> EnterpriseTaxStrategy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> : </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">ITaxStragety</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> double</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> CalculateTax</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">double</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> income</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">            return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">income</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> -</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 3500</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">&gt;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> ? (</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">income</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> -</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 3500</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">*</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0.045</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> : </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0.0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> InterestOperation</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        private</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> ITaxStragety</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> m_strategy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        public</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> InterestOperation</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">ITaxStragety</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> strategy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">            this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">m_strategy</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> strategy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> double</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> GetTax</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">double</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> income</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">            return</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> m_strategy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">CalculateTax</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">income</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> App</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> Main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">string</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[] </span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">args</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">            // 个人所得税方式</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">            InterestOperation</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> operation</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> new </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">InterestOperation</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(new </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">PersonalTaxStrategy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">());</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">            Console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">WriteLine</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;个人支付的税为：{0}&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">operation</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">GetTax</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">5000.00</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">));</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">            // 企业所得税</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">            operation</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> new </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">InterestOperation</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(new </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">EnterpriseTaxStrategy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">());</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">            Console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">WriteLine</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;企业支付的税为：{0}&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">operation</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">GetTax</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">50000.00</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">));</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">            Console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Read</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="三、策略者模式在-net中应用" tabindex="-1"><a class="header-anchor" href="#三、策略者模式在-net中应用"><span>三、策略者模式在.NET中应用</span></a></h1><p>在<code>.NET Framework</code>中也不乏策略模式的应用例子。例如，在<code>.NET</code>中，为集合类型<code>ArrayList</code>和<code>List&lt;T&gt;</code>提供的排序功能，其中实现就利用了策略模式，定义了<code>IComparer</code>接口来对比较算法进行封装，实现<code>IComparer</code>接口的类可以是顺序，或逆序地比较两个对象的大小，具体.NET中的实现可以使用反编译工具查看<a href="http://msdn.microsoft.com/zh-cn/library/234b841s(v=vs.110).aspx" target="_blank" rel="noopener noreferrer">List.Sort(IComparer)</a>的实现。其中<code>List&lt;T&gt;</code>就是承担着环境角色，而<code>IComparer&lt;T&gt;</code>接口承担着抽象策略角色，具体的策略角色就是实现了<code>IComparer&lt;T&gt;</code>接口的类，<code>List&lt;T&gt;</code>类本身实现了存在实现了该接口的类，我们可以自定义继承与该接口的具体策略类。</p><h1 id="四、策略者模式的适用场景" tabindex="-1"><a class="header-anchor" href="#四、策略者模式的适用场景"><span>四、策略者模式的适用场景</span></a></h1><p>在下面的情况下可以考虑使用策略模式：</p><ul><li>一个系统需要动态地在几种算法中选择一种的情况下。那么这些算法可以包装到一个个具体的算法类里面，并为这些具体的算法类提供一个统一的接口。</li><li>如果一个对象有很多的行为，如果不使用合适的模式，这些行为就只好使用多重的if-else语句来实现，此时，可以使用策略模式，把这些行为转移到相应的具体策略类里面，就可以避免使用难以维护的多重条件选择语句，并体现面向对象涉及的概念。</li></ul><h1 id="五、策略者模式的优缺点" tabindex="-1"><a class="header-anchor" href="#五、策略者模式的优缺点"><span>五、策略者模式的优缺点</span></a></h1><p>策略模式的主要优点有：</p><ul><li>策略类之间可以自由切换。由于策略类都实现同一个接口，所以使它们之间可以自由切换。</li><li>易于扩展。增加一个新的策略只需要添加一个具体的策略类即可，基本不需要改变原有的代码。</li><li>避免使用多重条件选择语句，充分体现面向对象设计思想。</li></ul><p>策略模式的主要缺点有：</p><ul><li>客户端必须知道所有的策略类，并自行决定使用哪一个策略类。这点可以考虑使用IOC容器和依赖注入的方式来解决，关于IOC容器和依赖注入（Dependency Inject）的文章可以参考：<a href="http://www.cnblogs.com/lusd/articles/3175062.html" target="_blank" rel="noopener noreferrer">IoC 容器和Dependency Injection 模式</a>。</li><li>策略模式会造成很多的策略类。</li></ul><h1 id="六、总结" tabindex="-1"><a class="header-anchor" href="#六、总结"><span>六、总结</span></a></h1><p>到这里，策略模式的介绍就结束了，策略模式主要是对方法的封装，把一系列方法封装到一系列的策略类中，从而使不同的策略类可以自由切换和避免在系统使用多重条件选择语句来选择针对不同情况来选择不同的方法。在下一章将会大家介绍责任链模式。</p>`,28)]))}const d=i(t,[["render",h],["__file","Strategy.html.vue"]]),A=JSON.parse('{"path":"/guide/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E7%AD%96%E7%95%A5%E6%A8%A1%E5%BC%8F/Strategy.html","title":"策略者模式（Stragety Pattern）","lang":"zh-CN","frontmatter":{"description":"策略者模式（Stragety Pattern） 一、引言 前面主题介绍的状态模式是对某个对象状态的抽象，而本文要介绍的策略模式也就是对策略进行抽象，策略的意思就是方法，所以也就是对方法的抽象，下面具体分享下我对策略模式的理解。 二、策略者模式介绍 2.1 策略模式的定义 在现实生活中，策略模式的例子也非常常见，例如，中国的所得税，分为企业所得税、外商投...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/vuepress-starter/guide/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E7%AD%96%E7%95%A5%E6%A8%A1%E5%BC%8F/Strategy.html"}],["meta",{"property":"og:site_name","content":"文档演示"}],["meta",{"property":"og:title","content":"策略者模式（Stragety Pattern）"}],["meta",{"property":"og:description","content":"策略者模式（Stragety Pattern） 一、引言 前面主题介绍的状态模式是对某个对象状态的抽象，而本文要介绍的策略模式也就是对策略进行抽象，策略的意思就是方法，所以也就是对方法的抽象，下面具体分享下我对策略模式的理解。 二、策略者模式介绍 2.1 策略模式的定义 在现实生活中，策略模式的例子也非常常见，例如，中国的所得税，分为企业所得税、外商投..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-10T13:11:46.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-10T13:11:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"策略者模式（Stragety Pattern）\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-12-10T13:11:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Hope\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"2.1 策略模式的定义","slug":"_2-1-策略模式的定义","link":"#_2-1-策略模式的定义","children":[]},{"level":2,"title":"2.2 策略模式的结构","slug":"_2-2-策略模式的结构","link":"#_2-2-策略模式的结构","children":[]},{"level":2,"title":"2.3 策略模式的实现","slug":"_2-3-策略模式的实现","link":"#_2-3-策略模式的实现","children":[]}],"git":{"createdTime":1733820951000,"updatedTime":1733836306000,"contributors":[{"name":"zhaokun","username":"zhaokun","email":"1162289133@qq.com","commits":1,"url":"https://github.com/zhaokun"},{"name":"cyoukon","username":"cyoukon","email":"z1162289133@gmail.com","commits":1,"url":"https://github.com/cyoukon"}]},"readingTime":{"minutes":5.55,"words":1665},"filePathRelative":"guide/设计模式/策略模式/Strategy.md","localizedDate":"2024年12月10日","autoDesc":true}');export{d as comp,A as data};