import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,f as n,o as l}from"./app-x_LcN8qt.js";const e={};function t(h,s){return l(),a("div",null,s[0]||(s[0]=[n(`<h1 id="模板方法模式-template-method" tabindex="-1"><a class="header-anchor" href="#模板方法模式-template-method"><span><a href="https://www.cnblogs.com/zhili/p/TemplateMethodPattern.html" target="_blank" rel="noopener noreferrer">模板方法模式（Template Method）</a></span></a></h1><h2 id="一、引言" tabindex="-1"><a class="header-anchor" href="#一、引言"><span>一、引言</span></a></h2><p>提到模板，大家肯定不免想到生活中的“简历模板”、“论文模板”、“Word中模版文件”等，在现实生活中，模板的概念就是——有一个规定的格式，然后每个人都可以根据自己的需求或情况去更新它，例如简历模板，下载下来的简历模板的格式都是相同的，然而我们下载下来简历模板之后我们可以根据自己的情况填充不同的内容要完成属于自己的简历。在设计模式中，模板方法模式中模板和生活中模板概念非常类似，下面让我们就详细介绍模板方法的定义，大家可以根据生活中模板的概念来理解模板方法的定义。</p><h2 id="二、模板方法模式详细介绍" tabindex="-1"><a class="header-anchor" href="#二、模板方法模式详细介绍"><span>二、模板方法模式详细介绍</span></a></h2><h2 id="_2-1-模板方法模式的定义" tabindex="-1"><a class="header-anchor" href="#_2-1-模板方法模式的定义"><span>2.1 模板方法模式的定义</span></a></h2><p>模板方法模式——在一个抽象类中定义一个操作中的算法骨架（对应于生活中的大家下载的模板），而将一些步骤延迟到子类中去实现（对应于我们根据自己的情况向模板填充内容）。模板方法使得子类可以不改变一个算法的结构前提下，重新定义算法的某些特定步骤，模板方法模式把不变行为搬到超类中，从而去除了子类中的重复代码。</p><h2 id="_2-2-模板方法模式的实现" tabindex="-1"><a class="header-anchor" href="#_2-2-模板方法模式的实现"><span>2.2 模板方法模式的实现</span></a></h2><p>理解了模板方法的定义之后，自然实现模板方法也不是什么难事了，下面以生活中炒蔬菜为例来实现下模板方法模式。在现实生活中，做蔬菜的步骤都大致相同，如果我们针对每种蔬菜类定义一个烧的方法，这样在每个类中都有很多相同的代码，为了解决这个问题，我们一般的思路肯定是把相同的部分抽象出来到抽象类中去定义，具体子类来实现具体的不同部分，这个思路也正式模板方法的实现精髓所在，具体实现代码如下：</p><div class="language-c# line-numbers-mode" data-highlighter="shiki" data-ext="c#" data-title="c#" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  // 客户端调用</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Client</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> Main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">string</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[] </span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">args</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">            // 创建一个菠菜实例并调用模板方法</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">            Spinach</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> spinach</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> new </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Spinach</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">            spinach</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">CookVegetabel</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">            Console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Read</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> abstract</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Vegetabel</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        // 模板方法，不要把模版方法定义为Virtual或abstract方法，避免被子类重写，防止更改流程的执行顺序</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> CookVegetabel</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">            Console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">WriteLine</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;抄蔬菜的一般做法&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">            this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">pourOil</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">            this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">HeatOil</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">            this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">pourVegetable</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">            this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">stir_fry</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        // 第一步倒油</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> pourOil</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">            Console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">WriteLine</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;倒油&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        // 把油烧热</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> HeatOil</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">            Console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">WriteLine</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;把油烧热&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        // 油热了之后倒蔬菜下去，具体哪种蔬菜由子类决定</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> abstract</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> pourVegetable</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        // 开发翻炒蔬菜</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> stir_fry</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">            Console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">WriteLine</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;翻炒&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // 菠菜</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Spinach</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> : </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Vegetabel</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">       </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> override</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> pourVegetable</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">            Console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">WriteLine</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;倒菠菜进锅中&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // 大白菜</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> ChineseCabbage</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> : </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Vegetabel</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    {      </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> override</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> pourVegetable</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">            Console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">WriteLine</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;倒大白菜进锅中&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的实现中，具体子类中重写了导入蔬菜种类的方法，因为这个真是烧菜方法中不同的地方，所以由具体子类去实现它。</p><h2 id="_2-3-模板方法模式的类图" tabindex="-1"><a class="header-anchor" href="#_2-3-模板方法模式的类图"><span>2.3 模板方法模式的类图</span></a></h2><p>实现完模板方法模式之后，让我们看看模板方法的类图结构，以理清该模式中类之间的关系，具体类图如下：</p><p>![img](Template Method.assets/28224429-7ac6df4a965c46af8f1e18ef7754357d.png)</p><p>模板方法模式中涉及了两个角色：</p><ul><li><strong>抽象模板角色（Vegetable扮演这个角色）</strong>：定义了一个或多个抽象操作，以便让子类实现，这些抽象操作称为基本操作。</li><li><strong>具体模板角色（ChineseCabbage和Spinach扮演这个角色）</strong>：实现父类所定义的一个或多个抽象方法。</li></ul><h2 id="三、模板方法模式的优缺点" tabindex="-1"><a class="header-anchor" href="#三、模板方法模式的优缺点"><span>三、模板方法模式的优缺点</span></a></h2><p>下面让我们继续分析下模板方法的优缺点。</p><p><strong>优点：</strong></p><ol><li>实现了代码复用</li><li>能够灵活应对子步骤的变化，符合开放-封闭原则</li></ol><p><strong>缺点</strong>：因为引入了一个抽象类，如果具体实现过多的话，需要用户或开发人员需要花更多的时间去理清类之间的关系。</p><p>附：在.NET中模板方法的应用也很多，例如我们在开发自定义的Web控件或WinForm控件时，我们只需要重写某个控件的部分方法。</p><h2 id="四、总结" tabindex="-1"><a class="header-anchor" href="#四、总结"><span>四、总结</span></a></h2><p>到这里，模板方法的介绍就结束了，模板方法模式在抽象类中定义了算法的实现步骤，将这些步骤的实现延迟到具体子类中去实现，从而使所有子类复用了父类的代码，所以模板方法模式是基于继承的一种实现代码复用的技术。</p>`,23)]))}const d=i(e,[["render",t],["__file","Template Method.html.vue"]]),r=JSON.parse('{"path":"/guide/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E6%A8%A1%E6%9D%BF%E6%96%B9%E6%B3%95%E6%A8%A1%E5%BC%8F/Template%20Method.html","title":"模板方法模式（Template Method）","lang":"zh-CN","frontmatter":{"description":"模板方法模式（Template Method） 一、引言 提到模板，大家肯定不免想到生活中的“简历模板”、“论文模板”、“Word中模版文件”等，在现实生活中，模板的概念就是——有一个规定的格式，然后每个人都可以根据自己的需求或情况去更新它，例如简历模板，下载下来的简历模板的格式都是相同的，然而我们下载下来简历模板之后我们可以根据自己的情况填充不同的内...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/vuepress-starter/guide/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E6%A8%A1%E6%9D%BF%E6%96%B9%E6%B3%95%E6%A8%A1%E5%BC%8F/Template%20Method.html"}],["meta",{"property":"og:site_name","content":"文档演示"}],["meta",{"property":"og:title","content":"模板方法模式（Template Method）"}],["meta",{"property":"og:description","content":"模板方法模式（Template Method） 一、引言 提到模板，大家肯定不免想到生活中的“简历模板”、“论文模板”、“Word中模版文件”等，在现实生活中，模板的概念就是——有一个规定的格式，然后每个人都可以根据自己的需求或情况去更新它，例如简历模板，下载下来的简历模板的格式都是相同的，然而我们下载下来简历模板之后我们可以根据自己的情况填充不同的内..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-10T08:55:51.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-10T08:55:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"模板方法模式（Template Method）\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-12-10T08:55:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Hope\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"一、引言","slug":"一、引言","link":"#一、引言","children":[]},{"level":2,"title":"二、模板方法模式详细介绍","slug":"二、模板方法模式详细介绍","link":"#二、模板方法模式详细介绍","children":[]},{"level":2,"title":"2.1 模板方法模式的定义","slug":"_2-1-模板方法模式的定义","link":"#_2-1-模板方法模式的定义","children":[]},{"level":2,"title":"2.2 模板方法模式的实现","slug":"_2-2-模板方法模式的实现","link":"#_2-2-模板方法模式的实现","children":[]},{"level":2,"title":"2.3 模板方法模式的类图","slug":"_2-3-模板方法模式的类图","link":"#_2-3-模板方法模式的类图","children":[]},{"level":2,"title":"三、模板方法模式的优缺点","slug":"三、模板方法模式的优缺点","link":"#三、模板方法模式的优缺点","children":[]},{"level":2,"title":"四、总结","slug":"四、总结","link":"#四、总结","children":[]}],"git":{"createdTime":1733820951000,"updatedTime":1733820951000,"contributors":[{"name":"cyoukon","username":"cyoukon","email":"z1162289133@gmail.com","commits":1,"url":"https://github.com/cyoukon"}]},"readingTime":{"minutes":4.05,"words":1215},"filePathRelative":"guide/设计模式/模板方法模式/Template Method.md","localizedDate":"2024年12月10日","autoDesc":true}');export{d as comp,r as data};