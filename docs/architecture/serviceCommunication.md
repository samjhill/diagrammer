# Service Communication

This diagram was automatically generated from your codebase.



```mermaid
graph TB
  classDef service fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
  classDef method fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  classDef interface fill:#fff3e0,stroke:#f57c00,stroke-width:2px

  subgraph getInput_service["getInput-service Service"]
    main_getInput["getInput"]:::method
    loadConfig_getInput["getInput"]:::method
    languages_getInput["getInput"]:::method
  end

  subgraph split_service["split-service Service"]
    main_split["split"]:::method
    loadConfig_split["split"]:::method
    languages_split["split"]:::method
    DiagramGenerator_split["split"]:::method
    based_split["split"]:::method
    const_split["split"]:::method
    let_split["split"]:::method
    for_split["split"]:::method
    calls_split["split"]:::method
    RelationshipAnalyzer_split["split"]:::method
    PythonAnalyzer_split["split"]:::method
    JavaScriptAnalyzer_split["split"]:::method
    declarations_split["split"]:::method
    ArchitecturalAnalyzer_split["split"]:::method
  end

  subgraph map_service["map-service Service"]
    main_map["map"]:::method
    loadConfig_map["map"]:::method
    languages_map["map"]:::method
    DiagramGenerator_map["map"]:::method
    based_map["map"]:::method
    const_map["map"]:::method
    let_map["map"]:::method
    for_map["map"]:::method
    calls_map["map"]:::method
    PythonAnalyzer_map["map"]:::method
    JavaScriptAnalyzer_map["map"]:::method
    declarations_map["map"]:::method
    CodeAnalyzer_map["map"]:::method
  end

  subgraph trim_service["trim-service Service"]
    main_trim["trim"]:::method
    loadConfig_trim["trim"]:::method
    languages_trim["trim"]:::method
    GitManager_trim["trim"]:::method
    PythonAnalyzer_trim["trim"]:::method
    JavaScriptAnalyzer_trim["trim"]:::method
    declarations_trim["trim"]:::method
  end

  subgraph getOctokit_service["getOctokit-service Service"]
    main_getOctokit["getOctokit"]:::method
    loadConfig_getOctokit["getOctokit"]:::method
    languages_getOctokit["getOctokit"]:::method
  end

  subgraph warning_service["warning-service Service"]
    main_warning["warning"]:::method
    loadConfig_warning["warning"]:::method
    languages_warning["warning"]:::method
  end

  subgraph info_service["info-service Service"]
    main_info["info"]:::method
    loadConfig_info["info"]:::method
    languages_info["info"]:::method
  end

  subgraph cwd_service["cwd-service Service"]
    main_cwd["cwd"]:::method
    loadConfig_cwd["cwd"]:::method
    languages_cwd["cwd"]:::method
    GitManager_cwd["cwd"]:::method
    PythonAnalyzer_cwd["cwd"]:::method
  end

  subgraph analyzeCodebase_service["analyzeCodebase-service Service"]
    main_analyzeCodebase["analyzeCodebase"]:::method
    loadConfig_analyzeCodebase["analyzeCodebase"]:::method
    languages_analyzeCodebase["analyzeCodebase"]:::method
  end

  subgraph keys_service["keys-service Service"]
    main_keys["keys"]:::method
    loadConfig_keys["keys"]:::method
    languages_keys["keys"]:::method
    DiagramGenerator_keys["keys"]:::method
    based_keys["keys"]:::method
    const_keys["keys"]:::method
    let_keys["keys"]:::method
    for_keys["keys"]:::method
    calls_keys["keys"]:::method
  end

  subgraph generateDiagrams_service["generateDiagrams-service Service"]
    main_generateDiagrams["generateDiagrams"]:::method
    loadConfig_generateDiagrams["generateDiagrams"]:::method
    languages_generateDiagrams["generateDiagrams"]:::method
  end

  subgraph ensureDir_service["ensureDir-service Service"]
    main_ensureDir["ensureDir"]:::method
    loadConfig_ensureDir["ensureDir"]:::method
    languages_ensureDir["ensureDir"]:::method
  end

  subgraph entries_service["entries-service Service"]
    main_entries["entries"]:::method
    loadConfig_entries["entries"]:::method
    languages_entries["entries"]:::method
    DiagramGenerator_entries["entries"]:::method
    based_entries["entries"]:::method
    const_entries["entries"]:::method
    let_entries["entries"]:::method
    for_entries["entries"]:::method
    calls_entries["entries"]:::method
    RelationshipAnalyzer_entries["entries"]:::method
    ArchitecturalAnalyzer_entries["entries"]:::method
  end

  subgraph join_service["join-service Service"]
    main_join["join"]:::method
    loadConfig_join["join"]:::method
    languages_join["join"]:::method
    DiagramGenerator_join["join"]:::method
    based_join["join"]:::method
    const_join["join"]:::method
    let_join["join"]:::method
    for_join["join"]:::method
    calls_join["join"]:::method
  end

  subgraph resolve_service["resolve-service Service"]
    main_resolve["resolve"]:::method
    loadConfig_resolve["resolve"]:::method
    languages_resolve["resolve"]:::method
  end

  subgraph writeFile_service["writeFile-service Service"]
    main_writeFile["writeFile"]:::method
    loadConfig_writeFile["writeFile"]:::method
    languages_writeFile["writeFile"]:::method
  end

  subgraph chmod_service["chmod-service Service"]
    main_chmod["chmod"]:::method
    loadConfig_chmod["chmod"]:::method
    languages_chmod["chmod"]:::method
  end

  subgraph push_service["push-service Service"]
    main_push["push"]:::method
    loadConfig_push["push"]:::method
    languages_push["push"]:::method
    DiagramGenerator_push["push"]:::method
    based_push["push"]:::method
    const_push["push"]:::method
    let_push["push"]:::method
    for_push["push"]:::method
    calls_push["push"]:::method
    TypeScriptAnalyzer_push["push"]:::method
    visit_push["push"]:::method
    RelationshipAnalyzer_push["push"]:::method
    PythonAnalyzer_push["push"]:::method
    JavaScriptAnalyzer_push["push"]:::method
    declarations_push["push"]:::method
    CodeAnalyzer_push["push"]:::method
    ArchitecturalAnalyzer_push["push"]:::method
  end

  subgraph commitChanges_service["commitChanges-service Service"]
    main_commitChanges["commitChanges"]:::method
    loadConfig_commitChanges["commitChanges"]:::method
    languages_commitChanges["commitChanges"]:::method
  end

  subgraph setFailed_service["setFailed-service Service"]
    main_setFailed["setFailed"]:::method
    loadConfig_setFailed["setFailed"]:::method
    languages_setFailed["setFailed"]:::method
  end

  subgraph error_service["error-service Service"]
    main_error["error"]:::method
    loadConfig_error["error"]:::method
    languages_error["error"]:::method
    GitManager_error["error"]:::method
  end

  subgraph pathExists_service["pathExists-service Service"]
    main_pathExists["pathExists"]:::method
    loadConfig_pathExists["pathExists"]:::method
    languages_pathExists["pathExists"]:::method
  end

  subgraph readFile_service["readFile-service Service"]
    main_readFile["readFile"]:::method
    loadConfig_readFile["readFile"]:::method
    languages_readFile["readFile"]:::method
    TypeScriptAnalyzer_readFile["readFile"]:::method
    visit_readFile["readFile"]:::method
    RelationshipAnalyzer_readFile["readFile"]:::method
    PythonAnalyzer_readFile["readFile"]:::method
    JavaScriptAnalyzer_readFile["readFile"]:::method
    declarations_readFile["readFile"]:::method
  end

  subgraph parse_service["parse-service Service"]
    main_parse["parse"]:::method
    loadConfig_parse["parse"]:::method
    languages_parse["parse"]:::method
  end

  subgraph log_service["log-service Service"]
    GitManager_log["log"]:::method
  end

  subgraph isGitRepository_service["isGitRepository-service Service"]
    GitManager_isGitRepository["isGitRepository"]:::method
  end

  subgraph chdir_service["chdir-service Service"]
    GitManager_chdir["chdir"]:::method
  end

  subgraph hasChanges_service["hasChanges-service Service"]
    GitManager_hasChanges["hasChanges"]:::method
  end

  subgraph configureGitUser_service["configureGitUser-service Service"]
    GitManager_configureGitUser["configureGitUser"]:::method
  end

  subgraph existsSync_service["existsSync-service Service"]
    GitManager_existsSync["existsSync"]:::method
  end

  subgraph readdirSync_service["readdirSync-service Service"]
    GitManager_readdirSync["readdirSync"]:::method
  end

  subgraph generateArchitectureDiagram_service["generateArchitectureDiagram-service Service"]
    DiagramGenerator_generateArchitectureDiagram["generateArchitectureDiagram"]:::method
    based_generateArchitectureDiagram["generateArchitectureDiagram"]:::method
    const_generateArchitectureDiagram["generateArchitectureDiagram"]:::method
    let_generateArchitectureDiagram["generateArchitectureDiagram"]:::method
    for_generateArchitectureDiagram["generateArchitectureDiagram"]:::method
    calls_generateArchitectureDiagram["generateArchitectureDiagram"]:::method
  end

  subgraph generateDependencyDiagram_service["generateDependencyDiagram-service Service"]
    DiagramGenerator_generateDependencyDiagram["generateDependencyDiagram"]:::method
    based_generateDependencyDiagram["generateDependencyDiagram"]:::method
    const_generateDependencyDiagram["generateDependencyDiagram"]:::method
    let_generateDependencyDiagram["generateDependencyDiagram"]:::method
    for_generateDependencyDiagram["generateDependencyDiagram"]:::method
    calls_generateDependencyDiagram["generateDependencyDiagram"]:::method
  end

  subgraph generateModuleDiagram_service["generateModuleDiagram-service Service"]
    DiagramGenerator_generateModuleDiagram["generateModuleDiagram"]:::method
    based_generateModuleDiagram["generateModuleDiagram"]:::method
    const_generateModuleDiagram["generateModuleDiagram"]:::method
    let_generateModuleDiagram["generateModuleDiagram"]:::method
    for_generateModuleDiagram["generateModuleDiagram"]:::method
    calls_generateModuleDiagram["generateModuleDiagram"]:::method
  end

  subgraph generateLayeredArchitectureDiagram_service["generateLayeredArchitectureDiagram-service Service"]
    DiagramGenerator_generateLayeredArchitectureDiagram["generateLayeredArchitectureDiagram"]:::method
    based_generateLayeredArchitectureDiagram["generateLayeredArchitectureDiagram"]:::method
    const_generateLayeredArchitectureDiagram["generateLayeredArchitectureDiagram"]:::method
    let_generateLayeredArchitectureDiagram["generateLayeredArchitectureDiagram"]:::method
    for_generateLayeredArchitectureDiagram["generateLayeredArchitectureDiagram"]:::method
    calls_generateLayeredArchitectureDiagram["generateLayeredArchitectureDiagram"]:::method
  end

  subgraph generateMVCDiagram_service["generateMVCDiagram-service Service"]
    DiagramGenerator_generateMVCDiagram["generateMVCDiagram"]:::method
    based_generateMVCDiagram["generateMVCDiagram"]:::method
    const_generateMVCDiagram["generateMVCDiagram"]:::method
    let_generateMVCDiagram["generateMVCDiagram"]:::method
    for_generateMVCDiagram["generateMVCDiagram"]:::method
    calls_generateMVCDiagram["generateMVCDiagram"]:::method
  end

  subgraph generateMicroservicesDiagram_service["generateMicroservicesDiagram-service Service"]
    DiagramGenerator_generateMicroservicesDiagram["generateMicroservicesDiagram"]:::method
    based_generateMicroservicesDiagram["generateMicroservicesDiagram"]:::method
    const_generateMicroservicesDiagram["generateMicroservicesDiagram"]:::method
    let_generateMicroservicesDiagram["generateMicroservicesDiagram"]:::method
    for_generateMicroservicesDiagram["generateMicroservicesDiagram"]:::method
    calls_generateMicroservicesDiagram["generateMicroservicesDiagram"]:::method
  end

  subgraph generateApiFlowDiagram_service["generateApiFlowDiagram-service Service"]
    DiagramGenerator_generateApiFlowDiagram["generateApiFlowDiagram"]:::method
    based_generateApiFlowDiagram["generateApiFlowDiagram"]:::method
    const_generateApiFlowDiagram["generateApiFlowDiagram"]:::method
    let_generateApiFlowDiagram["generateApiFlowDiagram"]:::method
    for_generateApiFlowDiagram["generateApiFlowDiagram"]:::method
    calls_generateApiFlowDiagram["generateApiFlowDiagram"]:::method
  end

  subgraph generateDataFlowDiagram_service["generateDataFlowDiagram-service Service"]
    DiagramGenerator_generateDataFlowDiagram["generateDataFlowDiagram"]:::method
    based_generateDataFlowDiagram["generateDataFlowDiagram"]:::method
    const_generateDataFlowDiagram["generateDataFlowDiagram"]:::method
    let_generateDataFlowDiagram["generateDataFlowDiagram"]:::method
    for_generateDataFlowDiagram["generateDataFlowDiagram"]:::method
    calls_generateDataFlowDiagram["generateDataFlowDiagram"]:::method
  end

  subgraph generateEventFlowDiagram_service["generateEventFlowDiagram-service Service"]
    DiagramGenerator_generateEventFlowDiagram["generateEventFlowDiagram"]:::method
    based_generateEventFlowDiagram["generateEventFlowDiagram"]:::method
    const_generateEventFlowDiagram["generateEventFlowDiagram"]:::method
    let_generateEventFlowDiagram["generateEventFlowDiagram"]:::method
    for_generateEventFlowDiagram["generateEventFlowDiagram"]:::method
    calls_generateEventFlowDiagram["generateEventFlowDiagram"]:::method
  end

  subgraph generateServiceCommunicationDiagram_service["generateServiceCommunicationDiagram-service Service"]
    DiagramGenerator_generateServiceCommunicationDiagram["generateServiceCommunicationDiagram"]:::method
    based_generateServiceCommunicationDiagram["generateServiceCommunicationDiagram"]:::method
    const_generateServiceCommunicationDiagram["generateServiceCommunicationDiagram"]:::method
    let_generateServiceCommunicationDiagram["generateServiceCommunicationDiagram"]:::method
    for_generateServiceCommunicationDiagram["generateServiceCommunicationDiagram"]:::method
    calls_generateServiceCommunicationDiagram["generateServiceCommunicationDiagram"]:::method
  end

  subgraph uniqueByName_service["uniqueByName-service Service"]
    DiagramGenerator_uniqueByName["uniqueByName"]:::method
    based_uniqueByName["uniqueByName"]:::method
    const_uniqueByName["uniqueByName"]:::method
    let_uniqueByName["uniqueByName"]:::method
    for_uniqueByName["uniqueByName"]:::method
    calls_uniqueByName["uniqueByName"]:::method
  end

  subgraph filterComponentsForDiagram_service["filterComponentsForDiagram-service Service"]
    DiagramGenerator_filterComponentsForDiagram["filterComponentsForDiagram"]:::method
    based_filterComponentsForDiagram["filterComponentsForDiagram"]:::method
    const_filterComponentsForDiagram["filterComponentsForDiagram"]:::method
    let_filterComponentsForDiagram["filterComponentsForDiagram"]:::method
    for_filterComponentsForDiagram["filterComponentsForDiagram"]:::method
    calls_filterComponentsForDiagram["filterComponentsForDiagram"]:::method
  end

  subgraph filterDependenciesForDiagram_service["filterDependenciesForDiagram-service Service"]
    DiagramGenerator_filterDependenciesForDiagram["filterDependenciesForDiagram"]:::method
    based_filterDependenciesForDiagram["filterDependenciesForDiagram"]:::method
    const_filterDependenciesForDiagram["filterDependenciesForDiagram"]:::method
    let_filterDependenciesForDiagram["filterDependenciesForDiagram"]:::method
    for_filterDependenciesForDiagram["filterDependenciesForDiagram"]:::method
    calls_filterDependenciesForDiagram["filterDependenciesForDiagram"]:::method
  end

  subgraph groupComponentsByDirectory_service["groupComponentsByDirectory-service Service"]
    DiagramGenerator_groupComponentsByDirectory["groupComponentsByDirectory"]:::method
    based_groupComponentsByDirectory["groupComponentsByDirectory"]:::method
    const_groupComponentsByDirectory["groupComponentsByDirectory"]:::method
    let_groupComponentsByDirectory["groupComponentsByDirectory"]:::method
    for_groupComponentsByDirectory["groupComponentsByDirectory"]:::method
    calls_groupComponentsByDirectory["groupComponentsByDirectory"]:::method
  end

  subgraph sort_service["sort-service Service"]
    DiagramGenerator_sort["sort"]:::method
    based_sort["sort"]:::method
    const_sort["sort"]:::method
    let_sort["sort"]:::method
    for_sort["sort"]:::method
    calls_sort["sort"]:::method
  end

  subgraph slice_service["slice-service Service"]
    DiagramGenerator_slice["slice"]:::method
    based_slice["slice"]:::method
    const_slice["slice"]:::method
    let_slice["slice"]:::method
    for_slice["slice"]:::method
    calls_slice["slice"]:::method
    TypeScriptAnalyzer_slice["slice"]:::method
    visit_slice["slice"]:::method
  end

  subgraph forEach_service["forEach-service Service"]
    DiagramGenerator_forEach["forEach"]:::method
    based_forEach["forEach"]:::method
    const_forEach["forEach"]:::method
    let_forEach["forEach"]:::method
    for_forEach["forEach"]:::method
    calls_forEach["forEach"]:::method
    TypeScriptAnalyzer_forEach["forEach"]:::method
    visit_forEach["forEach"]:::method
    RelationshipAnalyzer_forEach["forEach"]:::method
    PythonAnalyzer_forEach["forEach"]:::method
    JavaScriptAnalyzer_forEach["forEach"]:::method
    declarations_forEach["forEach"]:::method
    CodeAnalyzer_forEach["forEach"]:::method
    ArchitecturalAnalyzer_forEach["forEach"]:::method
  end

  subgraph sanitizeName_service["sanitizeName-service Service"]
    DiagramGenerator_sanitizeName["sanitizeName"]:::method
    based_sanitizeName["sanitizeName"]:::method
    const_sanitizeName["sanitizeName"]:::method
    let_sanitizeName["sanitizeName"]:::method
    for_sanitizeName["sanitizeName"]:::method
    calls_sanitizeName["sanitizeName"]:::method
  end

  subgraph getDisplayName_service["getDisplayName-service Service"]
    DiagramGenerator_getDisplayName["getDisplayName"]:::method
    based_getDisplayName["getDisplayName"]:::method
    const_getDisplayName["getDisplayName"]:::method
    let_getDisplayName["getDisplayName"]:::method
    for_getDisplayName["getDisplayName"]:::method
    calls_getDisplayName["getDisplayName"]:::method
  end

  subgraph getDisplayComponentName_service["getDisplayComponentName-service Service"]
    DiagramGenerator_getDisplayComponentName["getDisplayComponentName"]:::method
    based_getDisplayComponentName["getDisplayComponentName"]:::method
    const_getDisplayComponentName["getDisplayComponentName"]:::method
    let_getDisplayComponentName["getDisplayComponentName"]:::method
    for_getDisplayComponentName["getDisplayComponentName"]:::method
    calls_getDisplayComponentName["getDisplayComponentName"]:::method
  end

  subgraph getComponentMetrics_service["getComponentMetrics-service Service"]
    DiagramGenerator_getComponentMetrics["getComponentMetrics"]:::method
    based_getComponentMetrics["getComponentMetrics"]:::method
    const_getComponentMetrics["getComponentMetrics"]:::method
    let_getComponentMetrics["getComponentMetrics"]:::method
    for_getComponentMetrics["getComponentMetrics"]:::method
    calls_getComponentMetrics["getComponentMetrics"]:::method
  end

  subgraph enhanceComponentName_service["enhanceComponentName-service Service"]
    DiagramGenerator_enhanceComponentName["enhanceComponentName"]:::method
    based_enhanceComponentName["enhanceComponentName"]:::method
    const_enhanceComponentName["enhanceComponentName"]:::method
    let_enhanceComponentName["enhanceComponentName"]:::method
    for_enhanceComponentName["enhanceComponentName"]:::method
    calls_enhanceComponentName["enhanceComponentName"]:::method
  end

  subgraph generateComponentTooltip_service["generateComponentTooltip-service Service"]
    DiagramGenerator_generateComponentTooltip["generateComponentTooltip"]:::method
    based_generateComponentTooltip["generateComponentTooltip"]:::method
    const_generateComponentTooltip["generateComponentTooltip"]:::method
    let_generateComponentTooltip["generateComponentTooltip"]:::method
    for_generateComponentTooltip["generateComponentTooltip"]:::method
    calls_generateComponentTooltip["generateComponentTooltip"]:::method
  end

  subgraph getComponentClass_service["getComponentClass-service Service"]
    DiagramGenerator_getComponentClass["getComponentClass"]:::method
    based_getComponentClass["getComponentClass"]:::method
    const_getComponentClass["getComponentClass"]:::method
    let_getComponentClass["getComponentClass"]:::method
    for_getComponentClass["getComponentClass"]:::method
    calls_getComponentClass["getComponentClass"]:::method
  end

  subgraph addInternalRelationships_service["addInternalRelationships-service Service"]
    DiagramGenerator_addInternalRelationships["addInternalRelationships"]:::method
    based_addInternalRelationships["addInternalRelationships"]:::method
    const_addInternalRelationships["addInternalRelationships"]:::method
    let_addInternalRelationships["addInternalRelationships"]:::method
    for_addInternalRelationships["addInternalRelationships"]:::method
    calls_addInternalRelationships["addInternalRelationships"]:::method
  end

  subgraph addExternalDependencies_service["addExternalDependencies-service Service"]
    DiagramGenerator_addExternalDependencies["addExternalDependencies"]:::method
    based_addExternalDependencies["addExternalDependencies"]:::method
    const_addExternalDependencies["addExternalDependencies"]:::method
    let_addExternalDependencies["addExternalDependencies"]:::method
    for_addExternalDependencies["addExternalDependencies"]:::method
    calls_addExternalDependencies["addExternalDependencies"]:::method
  end

  subgraph wrapInMarkdown_service["wrapInMarkdown-service Service"]
    DiagramGenerator_wrapInMarkdown["wrapInMarkdown"]:::method
    based_wrapInMarkdown["wrapInMarkdown"]:::method
    const_wrapInMarkdown["wrapInMarkdown"]:::method
    let_wrapInMarkdown["wrapInMarkdown"]:::method
    for_wrapInMarkdown["wrapInMarkdown"]:::method
    calls_wrapInMarkdown["wrapInMarkdown"]:::method
  end

  subgraph filter_service["filter-service Service"]
    DiagramGenerator_filter["filter"]:::method
    based_filter["filter"]:::method
    const_filter["filter"]:::method
    let_filter["filter"]:::method
    for_filter["filter"]:::method
    calls_filter["filter"]:::method
    RelationshipAnalyzer_filter["filter"]:::method
    CodeAnalyzer_filter["filter"]:::method
  end

  subgraph isExternalDependency_service["isExternalDependency-service Service"]
    DiagramGenerator_isExternalDependency["isExternalDependency"]:::method
    based_isExternalDependency["isExternalDependency"]:::method
    const_isExternalDependency["isExternalDependency"]:::method
    let_isExternalDependency["isExternalDependency"]:::method
    for_isExternalDependency["isExternalDependency"]:::method
    calls_isExternalDependency["isExternalDependency"]:::method
  end

  subgraph has_service["has-service Service"]
    DiagramGenerator_has["has"]:::method
    based_has["has"]:::method
    const_has["has"]:::method
    let_has["has"]:::method
    for_has["has"]:::method
    calls_has["has"]:::method
    RelationshipAnalyzer_has["has"]:::method
    CodeAnalyzer_has["has"]:::method
  end

  subgraph add_service["add-service Service"]
    DiagramGenerator_add["add"]:::method
    based_add["add"]:::method
    const_add["add"]:::method
    let_add["add"]:::method
    for_add["add"]:::method
    calls_add["add"]:::method
    RelationshipAnalyzer_add["add"]:::method
    CodeAnalyzer_add["add"]:::method
  end

  subgraph dirname_service["dirname-service Service"]
    DiagramGenerator_dirname["dirname"]:::method
    based_dirname["dirname"]:::method
    const_dirname["dirname"]:::method
    let_dirname["dirname"]:::method
    for_dirname["dirname"]:::method
    calls_dirname["dirname"]:::method
  end

  subgraph replace_service["replace-service Service"]
    DiagramGenerator_replace["replace"]:::method
    based_replace["replace"]:::method
    const_replace["replace"]:::method
    let_replace["replace"]:::method
    for_replace["replace"]:::method
    calls_replace["replace"]:::method
    ArchitecturalAnalyzer_replace["replace"]:::method
  end

  subgraph some_service["some-service Service"]
    DiagramGenerator_some["some"]:::method
    based_some["some"]:::method
    const_some["some"]:::method
    let_some["some"]:::method
    for_some["some"]:::method
    calls_some["some"]:::method
    TypeScriptAnalyzer_some["some"]:::method
    visit_some["some"]:::method
    ArchitecturalAnalyzer_some["some"]:::method
  end

  subgraph startsWith_service["startsWith-service Service"]
    DiagramGenerator_startsWith["startsWith"]:::method
    based_startsWith["startsWith"]:::method
    const_startsWith["startsWith"]:::method
    let_startsWith["startsWith"]:::method
    for_startsWith["startsWith"]:::method
    calls_startsWith["startsWith"]:::method
    PythonAnalyzer_startsWith["startsWith"]:::method
  end

  subgraph generateDiagramMetadata_service["generateDiagramMetadata-service Service"]
    DiagramGenerator_generateDiagramMetadata["generateDiagramMetadata"]:::method
    based_generateDiagramMetadata["generateDiagramMetadata"]:::method
    const_generateDiagramMetadata["generateDiagramMetadata"]:::method
    let_generateDiagramMetadata["generateDiagramMetadata"]:::method
    for_generateDiagramMetadata["generateDiagramMetadata"]:::method
    calls_generateDiagramMetadata["generateDiagramMetadata"]:::method
  end

  subgraph generateLegend_service["generateLegend-service Service"]
    DiagramGenerator_generateLegend["generateLegend"]:::method
    based_generateLegend["generateLegend"]:::method
    const_generateLegend["generateLegend"]:::method
    let_generateLegend["generateLegend"]:::method
    for_generateLegend["generateLegend"]:::method
    calls_generateLegend["generateLegend"]:::method
  end

  subgraph calculateDiagramStats_service["calculateDiagramStats-service Service"]
    DiagramGenerator_calculateDiagramStats["calculateDiagramStats"]:::method
    based_calculateDiagramStats["calculateDiagramStats"]:::method
    const_calculateDiagramStats["calculateDiagramStats"]:::method
    let_calculateDiagramStats["calculateDiagramStats"]:::method
    for_calculateDiagramStats["calculateDiagramStats"]:::method
    calls_calculateDiagramStats["calculateDiagramStats"]:::method
  end

  subgraph generateArchitecturalInsights_service["generateArchitecturalInsights-service Service"]
    DiagramGenerator_generateArchitecturalInsights["generateArchitecturalInsights"]:::method
    based_generateArchitecturalInsights["generateArchitecturalInsights"]:::method
    const_generateArchitecturalInsights["generateArchitecturalInsights"]:::method
    let_generateArchitecturalInsights["generateArchitecturalInsights"]:::method
    for_generateArchitecturalInsights["generateArchitecturalInsights"]:::method
    calls_generateArchitecturalInsights["generateArchitecturalInsights"]:::method
  end

  subgraph toLocaleDateString_service["toLocaleDateString-service Service"]
    DiagramGenerator_toLocaleDateString["toLocaleDateString"]:::method
    based_toLocaleDateString["toLocaleDateString"]:::method
    const_toLocaleDateString["toLocaleDateString"]:::method
    let_toLocaleDateString["toLocaleDateString"]:::method
    for_toLocaleDateString["toLocaleDateString"]:::method
    calls_toLocaleDateString["toLocaleDateString"]:::method
  end

  subgraph analyzeComponentTypes_service["analyzeComponentTypes-service Service"]
    DiagramGenerator_analyzeComponentTypes["analyzeComponentTypes"]:::method
    based_analyzeComponentTypes["analyzeComponentTypes"]:::method
    const_analyzeComponentTypes["analyzeComponentTypes"]:::method
    let_analyzeComponentTypes["analyzeComponentTypes"]:::method
    for_analyzeComponentTypes["analyzeComponentTypes"]:::method
    calls_analyzeComponentTypes["analyzeComponentTypes"]:::method
  end

  subgraph analyzeDependencies_service["analyzeDependencies-service Service"]
    DiagramGenerator_analyzeDependencies["analyzeDependencies"]:::method
    based_analyzeDependencies["analyzeDependencies"]:::method
    const_analyzeDependencies["analyzeDependencies"]:::method
    let_analyzeDependencies["analyzeDependencies"]:::method
    for_analyzeDependencies["analyzeDependencies"]:::method
    calls_analyzeDependencies["analyzeDependencies"]:::method
  end

  subgraph analyzeComplexity_service["analyzeComplexity-service Service"]
    DiagramGenerator_analyzeComplexity["analyzeComplexity"]:::method
    based_analyzeComplexity["analyzeComplexity"]:::method
    const_analyzeComplexity["analyzeComplexity"]:::method
    let_analyzeComplexity["analyzeComplexity"]:::method
    for_analyzeComplexity["analyzeComplexity"]:::method
    calls_analyzeComplexity["analyzeComplexity"]:::method
  end

  subgraph toLowerCase_service["toLowerCase-service Service"]
    DiagramGenerator_toLowerCase["toLowerCase"]:::method
    based_toLowerCase["toLowerCase"]:::method
    const_toLowerCase["toLowerCase"]:::method
    let_toLowerCase["toLowerCase"]:::method
    for_toLowerCase["toLowerCase"]:::method
    calls_toLowerCase["toLowerCase"]:::method
    RelationshipAnalyzer_toLowerCase["toLowerCase"]:::method
    ArchitecturalAnalyzer_toLowerCase["toLowerCase"]:::method
  end

  subgraph includes_service["includes-service Service"]
    DiagramGenerator_includes["includes"]:::method
    based_includes["includes"]:::method
    const_includes["includes"]:::method
    let_includes["includes"]:::method
    for_includes["includes"]:::method
    calls_includes["includes"]:::method
    RelationshipAnalyzer_includes["includes"]:::method
    PythonAnalyzer_includes["includes"]:::method
    JavaScriptAnalyzer_includes["includes"]:::method
    declarations_includes["includes"]:::method
    CodeAnalyzer_includes["includes"]:::method
    ArchitecturalAnalyzer_includes["includes"]:::method
  end

  subgraph detectCircularDependencies_service["detectCircularDependencies-service Service"]
    DiagramGenerator_detectCircularDependencies["detectCircularDependencies"]:::method
    based_detectCircularDependencies["detectCircularDependencies"]:::method
    const_detectCircularDependencies["detectCircularDependencies"]:::method
    let_detectCircularDependencies["detectCircularDependencies"]:::method
    for_detectCircularDependencies["detectCircularDependencies"]:::method
    calls_detectCircularDependencies["detectCircularDependencies"]:::method
  end

  subgraph set_service["set-service Service"]
    DiagramGenerator_set["set"]:::method
    based_set["set"]:::method
    const_set["set"]:::method
    let_set["set"]:::method
    for_set["set"]:::method
    calls_set["set"]:::method
  end

  subgraph get_service["get-service Service"]
    DiagramGenerator_get["get"]:::method
    based_get["get"]:::method
    const_get["get"]:::method
    let_get["get"]:::method
    for_get["get"]:::method
    calls_get["get"]:::method
  end

  subgraph calculateComplexity_service["calculateComplexity-service Service"]
    DiagramGenerator_calculateComplexity["calculateComplexity"]:::method
    based_calculateComplexity["calculateComplexity"]:::method
    const_calculateComplexity["calculateComplexity"]:::method
    let_calculateComplexity["calculateComplexity"]:::method
    for_calculateComplexity["calculateComplexity"]:::method
    calls_calculateComplexity["calculateComplexity"]:::method
  end

  subgraph from_service["from-service Service"]
    DiagramGenerator_from["from"]:::method
    based_from["from"]:::method
    const_from["from"]:::method
    let_from["from"]:::method
    for_from["from"]:::method
    calls_from["from"]:::method
  end

  subgraph toUpperCase_service["toUpperCase-service Service"]
    DiagramGenerator_toUpperCase["toUpperCase"]:::method
    based_toUpperCase["toUpperCase"]:::method
    const_toUpperCase["toUpperCase"]:::method
    let_toUpperCase["toUpperCase"]:::method
    for_toUpperCase["toUpperCase"]:::method
    calls_toUpperCase["toUpperCase"]:::method
    RelationshipAnalyzer_toUpperCase["toUpperCase"]:::method
  end

  subgraph groupRelationshipsBySource_service["groupRelationshipsBySource-service Service"]
    DiagramGenerator_groupRelationshipsBySource["groupRelationshipsBySource"]:::method
    based_groupRelationshipsBySource["groupRelationshipsBySource"]:::method
    const_groupRelationshipsBySource["groupRelationshipsBySource"]:::method
    let_groupRelationshipsBySource["groupRelationshipsBySource"]:::method
    for_groupRelationshipsBySource["groupRelationshipsBySource"]:::method
    calls_groupRelationshipsBySource["groupRelationshipsBySource"]:::method
  end

  subgraph groupRelationshipsByType_service["groupRelationshipsByType-service Service"]
    DiagramGenerator_groupRelationshipsByType["groupRelationshipsByType"]:::method
    based_groupRelationshipsByType["groupRelationshipsByType"]:::method
    const_groupRelationshipsByType["groupRelationshipsByType"]:::method
    let_groupRelationshipsByType["groupRelationshipsByType"]:::method
    for_groupRelationshipsByType["groupRelationshipsByType"]:::method
    calls_groupRelationshipsByType["groupRelationshipsByType"]:::method
  end

  subgraph getDataFlowClass_service["getDataFlowClass-service Service"]
    DiagramGenerator_getDataFlowClass["getDataFlowClass"]:::method
    based_getDataFlowClass["getDataFlowClass"]:::method
    const_getDataFlowClass["getDataFlowClass"]:::method
    let_getDataFlowClass["getDataFlowClass"]:::method
    for_getDataFlowClass["getDataFlowClass"]:::method
    calls_getDataFlowClass["getDataFlowClass"]:::method
  end

  subgraph groupRelationshipsByEvent_service["groupRelationshipsByEvent-service Service"]
    DiagramGenerator_groupRelationshipsByEvent["groupRelationshipsByEvent"]:::method
    based_groupRelationshipsByEvent["groupRelationshipsByEvent"]:::method
    const_groupRelationshipsByEvent["groupRelationshipsByEvent"]:::method
    let_groupRelationshipsByEvent["groupRelationshipsByEvent"]:::method
    for_groupRelationshipsByEvent["groupRelationshipsByEvent"]:::method
    calls_groupRelationshipsByEvent["groupRelationshipsByEvent"]:::method
  end

  subgraph groupRelationshipsByService_service["groupRelationshipsByService-service Service"]
    DiagramGenerator_groupRelationshipsByService["groupRelationshipsByService"]:::method
    based_groupRelationshipsByService["groupRelationshipsByService"]:::method
    const_groupRelationshipsByService["groupRelationshipsByService"]:::method
    let_groupRelationshipsByService["groupRelationshipsByService"]:::method
    for_groupRelationshipsByService["groupRelationshipsByService"]:::method
    calls_groupRelationshipsByService["groupRelationshipsByService"]:::method
  end

  subgraph isTestFile_service["isTestFile-service Service"]
    DiagramGenerator_isTestFile["isTestFile"]:::method
    based_isTestFile["isTestFile"]:::method
    const_isTestFile["isTestFile"]:::method
    let_isTestFile["isTestFile"]:::method
    for_isTestFile["isTestFile"]:::method
    calls_isTestFile["isTestFile"]:::method
  end

  subgraph isDependencyLayer_service["isDependencyLayer-service Service"]
    DiagramGenerator_isDependencyLayer["isDependencyLayer"]:::method
    based_isDependencyLayer["isDependencyLayer"]:::method
    const_isDependencyLayer["isDependencyLayer"]:::method
    let_isDependencyLayer["isDependencyLayer"]:::method
    for_isDependencyLayer["isDependencyLayer"]:::method
    calls_isDependencyLayer["isDependencyLayer"]:::method
  end

  subgraph isInternalImplementation_service["isInternalImplementation-service Service"]
    DiagramGenerator_isInternalImplementation["isInternalImplementation"]:::method
    based_isInternalImplementation["isInternalImplementation"]:::method
    const_isInternalImplementation["isInternalImplementation"]:::method
    let_isInternalImplementation["isInternalImplementation"]:::method
    for_isInternalImplementation["isInternalImplementation"]:::method
    calls_isInternalImplementation["isInternalImplementation"]:::method
  end

  subgraph isUtilityFile_service["isUtilityFile-service Service"]
    DiagramGenerator_isUtilityFile["isUtilityFile"]:::method
    based_isUtilityFile["isUtilityFile"]:::method
    const_isUtilityFile["isUtilityFile"]:::method
    let_isUtilityFile["isUtilityFile"]:::method
    for_isUtilityFile["isUtilityFile"]:::method
    calls_isUtilityFile["isUtilityFile"]:::method
  end

  subgraph getComponentImportance_service["getComponentImportance-service Service"]
    DiagramGenerator_getComponentImportance["getComponentImportance"]:::method
    based_getComponentImportance["getComponentImportance"]:::method
    const_getComponentImportance["getComponentImportance"]:::method
    let_getComponentImportance["getComponentImportance"]:::method
    for_getComponentImportance["getComponentImportance"]:::method
    calls_getComponentImportance["getComponentImportance"]:::method
  end

  subgraph test_service["test-service Service"]
    DiagramGenerator_test["test"]:::method
    based_test["test"]:::method
    const_test["test"]:::method
    let_test["test"]:::method
    for_test["test"]:::method
    calls_test["test"]:::method
    ArchitecturalAnalyzer_test["test"]:::method
  end

  subgraph substring_service["substring-service Service"]
    DiagramGenerator_substring["substring"]:::method
    based_substring["substring"]:::method
    const_substring["substring"]:::method
    let_substring["substring"]:::method
    for_substring["substring"]:::method
    calls_substring["substring"]:::method
    JavaScriptAnalyzer_substring["substring"]:::method
    declarations_substring["substring"]:::method
  end

  subgraph find_service["find-service Service"]
    DiagramGenerator_find["find"]:::method
    based_find["find"]:::method
    const_find["find"]:::method
    let_find["find"]:::method
    for_find["find"]:::method
    calls_find["find"]:::method
  end

  subgraph getRelationshipLabel_service["getRelationshipLabel-service Service"]
    DiagramGenerator_getRelationshipLabel["getRelationshipLabel"]:::method
    based_getRelationshipLabel["getRelationshipLabel"]:::method
    const_getRelationshipLabel["getRelationshipLabel"]:::method
    let_getRelationshipLabel["getRelationshipLabel"]:::method
    for_getRelationshipLabel["getRelationshipLabel"]:::method
    calls_getRelationshipLabel["getRelationshipLabel"]:::method
  end

  subgraph getRelationshipStyle_service["getRelationshipStyle-service Service"]
    DiagramGenerator_getRelationshipStyle["getRelationshipStyle"]:::method
    based_getRelationshipStyle["getRelationshipStyle"]:::method
    const_getRelationshipStyle["getRelationshipStyle"]:::method
    let_getRelationshipStyle["getRelationshipStyle"]:::method
    for_getRelationshipStyle["getRelationshipStyle"]:::method
    calls_getRelationshipStyle["getRelationshipStyle"]:::method
  end

  subgraph addArchitecturalRelationships_service["addArchitecturalRelationships-service Service"]
    DiagramGenerator_addArchitecturalRelationships["addArchitecturalRelationships"]:::method
    based_addArchitecturalRelationships["addArchitecturalRelationships"]:::method
    const_addArchitecturalRelationships["addArchitecturalRelationships"]:::method
    let_addArchitecturalRelationships["addArchitecturalRelationships"]:::method
    for_addArchitecturalRelationships["addArchitecturalRelationships"]:::method
    calls_addArchitecturalRelationships["addArchitecturalRelationships"]:::method
  end

  subgraph groupDependenciesByType_service["groupDependenciesByType-service Service"]
    DiagramGenerator_groupDependenciesByType["groupDependenciesByType"]:::method
    based_groupDependenciesByType["groupDependenciesByType"]:::method
    const_groupDependenciesByType["groupDependenciesByType"]:::method
    let_groupDependenciesByType["groupDependenciesByType"]:::method
    for_groupDependenciesByType["groupDependenciesByType"]:::method
    calls_groupDependenciesByType["groupDependenciesByType"]:::method
  end

  subgraph getDependencyClass_service["getDependencyClass-service Service"]
    DiagramGenerator_getDependencyClass["getDependencyClass"]:::method
    based_getDependencyClass["getDependencyClass"]:::method
    const_getDependencyClass["getDependencyClass"]:::method
    let_getDependencyClass["getDependencyClass"]:::method
    for_getDependencyClass["getDependencyClass"]:::method
    calls_getDependencyClass["getDependencyClass"]:::method
  end

  subgraph getDependencyTypeLabel_service["getDependencyTypeLabel-service Service"]
    DiagramGenerator_getDependencyTypeLabel["getDependencyTypeLabel"]:::method
    based_getDependencyTypeLabel["getDependencyTypeLabel"]:::method
    const_getDependencyTypeLabel["getDependencyTypeLabel"]:::method
    let_getDependencyTypeLabel["getDependencyTypeLabel"]:::method
    for_getDependencyTypeLabel["getDependencyTypeLabel"]:::method
    calls_getDependencyTypeLabel["getDependencyTypeLabel"]:::method
  end

  subgraph isFrameworkDependency_service["isFrameworkDependency-service Service"]
    DiagramGenerator_isFrameworkDependency["isFrameworkDependency"]:::method
    based_isFrameworkDependency["isFrameworkDependency"]:::method
    const_isFrameworkDependency["isFrameworkDependency"]:::method
    let_isFrameworkDependency["isFrameworkDependency"]:::method
    for_isFrameworkDependency["isFrameworkDependency"]:::method
    calls_isFrameworkDependency["isFrameworkDependency"]:::method
  end

  subgraph calculateComponentSize_service["calculateComponentSize-service Service"]
    DiagramGenerator_calculateComponentSize["calculateComponentSize"]:::method
    based_calculateComponentSize["calculateComponentSize"]:::method
    const_calculateComponentSize["calculateComponentSize"]:::method
    let_calculateComponentSize["calculateComponentSize"]:::method
    for_calculateComponentSize["calculateComponentSize"]:::method
    calls_calculateComponentSize["calculateComponentSize"]:::method
  end

  subgraph countDependencies_service["countDependencies-service Service"]
    DiagramGenerator_countDependencies["countDependencies"]:::method
    based_countDependencies["countDependencies"]:::method
    const_countDependencies["countDependencies"]:::method
    let_countDependencies["countDependencies"]:::method
    for_countDependencies["countDependencies"]:::method
    calls_countDependencies["countDependencies"]:::method
  end

  subgraph min_service["min-service Service"]
    DiagramGenerator_min["min"]:::method
    based_min["min"]:::method
    const_min["min"]:::method
    let_min["min"]:::method
    for_min["min"]:::method
    calls_min["min"]:::method
    RelationshipAnalyzer_min["min"]:::method
  end

  subgraph findTypeScriptFiles_service["findTypeScriptFiles-service Service"]
    TypeScriptAnalyzer_findTypeScriptFiles["findTypeScriptFiles"]:::method
    visit_findTypeScriptFiles["findTypeScriptFiles"]:::method
  end

  subgraph analyzeFile_service["analyzeFile-service Service"]
    TypeScriptAnalyzer_analyzeFile["analyzeFile"]:::method
    visit_analyzeFile["analyzeFile"]:::method
    PythonAnalyzer_analyzeFile["analyzeFile"]:::method
    JavaScriptAnalyzer_analyzeFile["analyzeFile"]:::method
    declarations_analyzeFile["analyzeFile"]:::method
  end

  subgraph warn_service["warn-service Service"]
    TypeScriptAnalyzer_warn["warn"]:::method
    visit_warn["warn"]:::method
    RelationshipAnalyzer_warn["warn"]:::method
    PythonAnalyzer_warn["warn"]:::method
    JavaScriptAnalyzer_warn["warn"]:::method
    declarations_warn["warn"]:::method
  end

  subgraph createSourceFile_service["createSourceFile-service Service"]
    TypeScriptAnalyzer_createSourceFile["createSourceFile"]:::method
    visit_createSourceFile["createSourceFile"]:::method
  end

  subgraph extractImports_service["extractImports-service Service"]
    TypeScriptAnalyzer_extractImports["extractImports"]:::method
    visit_extractImports["extractImports"]:::method
    PythonAnalyzer_extractImports["extractImports"]:::method
    JavaScriptAnalyzer_extractImports["extractImports"]:::method
    declarations_extractImports["extractImports"]:::method
  end

  subgraph extractExports_service["extractExports-service Service"]
    TypeScriptAnalyzer_extractExports["extractExports"]:::method
    visit_extractExports["extractExports"]:::method
    JavaScriptAnalyzer_extractExports["extractExports"]:::method
    declarations_extractExports["extractExports"]:::method
  end

  subgraph extractComponents_service["extractComponents-service Service"]
    TypeScriptAnalyzer_extractComponents["extractComponents"]:::method
    visit_extractComponents["extractComponents"]:::method
    JavaScriptAnalyzer_extractComponents["extractComponents"]:::method
    declarations_extractComponents["extractComponents"]:::method
  end

  subgraph isImportDeclaration_service["isImportDeclaration-service Service"]
    TypeScriptAnalyzer_isImportDeclaration["isImportDeclaration"]:::method
    visit_isImportDeclaration["isImportDeclaration"]:::method
  end

  subgraph getText_service["getText-service Service"]
    TypeScriptAnalyzer_getText["getText"]:::method
    visit_getText["getText"]:::method
  end

  subgraph isNamedImports_service["isNamedImports-service Service"]
    TypeScriptAnalyzer_isNamedImports["isNamedImports"]:::method
    visit_isNamedImports["isNamedImports"]:::method
  end

  subgraph forEachChild_service["forEachChild-service Service"]
    TypeScriptAnalyzer_forEachChild["forEachChild"]:::method
    visit_forEachChild["forEachChild"]:::method
  end

  subgraph isExportDeclaration_service["isExportDeclaration-service Service"]
    TypeScriptAnalyzer_isExportDeclaration["isExportDeclaration"]:::method
    visit_isExportDeclaration["isExportDeclaration"]:::method
  end

  subgraph isNamedExports_service["isNamedExports-service Service"]
    TypeScriptAnalyzer_isNamedExports["isNamedExports"]:::method
    visit_isNamedExports["isNamedExports"]:::method
  end

  subgraph isExportAssignment_service["isExportAssignment-service Service"]
    TypeScriptAnalyzer_isExportAssignment["isExportAssignment"]:::method
    visit_isExportAssignment["isExportAssignment"]:::method
  end

  subgraph isFunctionDeclaration_service["isFunctionDeclaration-service Service"]
    TypeScriptAnalyzer_isFunctionDeclaration["isFunctionDeclaration"]:::method
    visit_isFunctionDeclaration["isFunctionDeclaration"]:::method
  end

  subgraph isClassDeclaration_service["isClassDeclaration-service Service"]
    TypeScriptAnalyzer_isClassDeclaration["isClassDeclaration"]:::method
    visit_isClassDeclaration["isClassDeclaration"]:::method
  end

  subgraph isInterfaceDeclaration_service["isInterfaceDeclaration-service Service"]
    TypeScriptAnalyzer_isInterfaceDeclaration["isInterfaceDeclaration"]:::method
    visit_isInterfaceDeclaration["isInterfaceDeclaration"]:::method
  end

  subgraph isVariableDeclaration_service["isVariableDeclaration-service Service"]
    TypeScriptAnalyzer_isVariableDeclaration["isVariableDeclaration"]:::method
    visit_isVariableDeclaration["isVariableDeclaration"]:::method
  end

  subgraph service["service Service"]
    RelationshipAnalyzer_undefined["undefined"]:::method
    ArchitecturalAnalyzer_undefined["undefined"]:::method
  end

  subgraph detectRelationshipsOfType_service["detectRelationshipsOfType-service Service"]
    RelationshipAnalyzer_detectRelationshipsOfType["detectRelationshipsOfType"]:::method
  end

  subgraph deduplicateRelationships_service["deduplicateRelationships-service Service"]
    RelationshipAnalyzer_deduplicateRelationships["deduplicateRelationships"]:::method
  end

  subgraph exec_service["exec-service Service"]
    RelationshipAnalyzer_exec["exec"]:::method
    PythonAnalyzer_exec["exec"]:::method
    JavaScriptAnalyzer_exec["exec"]:::method
    declarations_exec["exec"]:::method
    ArchitecturalAnalyzer_exec["exec"]:::method
  end

  subgraph createRelationship_service["createRelationship-service Service"]
    RelationshipAnalyzer_createRelationship["createRelationship"]:::method
  end

  subgraph calculateConfidence_service["calculateConfidence-service Service"]
    RelationshipAnalyzer_calculateConfidence["calculateConfidence"]:::method
    ArchitecturalAnalyzer_calculateConfidence["calculateConfidence"]:::method
  end

  subgraph extractApiTarget_service["extractApiTarget-service Service"]
    RelationshipAnalyzer_extractApiTarget["extractApiTarget"]:::method
  end

  subgraph extractHttpMethod_service["extractHttpMethod-service Service"]
    RelationshipAnalyzer_extractHttpMethod["extractHttpMethod"]:::method
  end

  subgraph extractDataTarget_service["extractDataTarget-service Service"]
    RelationshipAnalyzer_extractDataTarget["extractDataTarget"]:::method
  end

  subgraph extractDataType_service["extractDataType-service Service"]
    RelationshipAnalyzer_extractDataType["extractDataType"]:::method
  end

  subgraph extractDataDescription_service["extractDataDescription-service Service"]
    RelationshipAnalyzer_extractDataDescription["extractDataDescription"]:::method
  end

  subgraph extractServiceTarget_service["extractServiceTarget-service Service"]
    RelationshipAnalyzer_extractServiceTarget["extractServiceTarget"]:::method
  end

  subgraph extractDatabaseTarget_service["extractDatabaseTarget-service Service"]
    RelationshipAnalyzer_extractDatabaseTarget["extractDatabaseTarget"]:::method
  end

  subgraph extractDatabaseOperation_service["extractDatabaseOperation-service Service"]
    RelationshipAnalyzer_extractDatabaseOperation["extractDatabaseOperation"]:::method
  end

  subgraph match_service["match-service Service"]
    RelationshipAnalyzer_match["match"]:::method
    PythonAnalyzer_match["match"]:::method
  end

  subgraph findFiles_service["findFiles-service Service"]
    PythonAnalyzer_findFiles["findFiles"]:::method
  end

  subgraph relative_service["relative-service Service"]
    PythonAnalyzer_relative["relative"]:::method
  end

  subgraph basename_service["basename-service Service"]
    PythonAnalyzer_basename["basename"]:::method
  end

  subgraph extractClasses_service["extractClasses-service Service"]
    PythonAnalyzer_extractClasses["extractClasses"]:::method
  end

  subgraph extractFunctions_service["extractFunctions-service Service"]
    PythonAnalyzer_extractFunctions["extractFunctions"]:::method
  end

  subgraph isLocalImport_service["isLocalImport-service Service"]
    PythonAnalyzer_isLocalImport["isLocalImport"]:::method
  end

  subgraph isKnownExternalModule_service["isKnownExternalModule-service Service"]
    PythonAnalyzer_isKnownExternalModule["isKnownExternalModule"]:::method
  end

  subgraph findJavaScriptFiles_service["findJavaScriptFiles-service Service"]
    JavaScriptAnalyzer_findJavaScriptFiles["findJavaScriptFiles"]:::method
    declarations_findJavaScriptFiles["findJavaScriptFiles"]:::method
  end

  subgraph indexOf_service["indexOf-service Service"]
    JavaScriptAnalyzer_indexOf["indexOf"]:::method
    declarations_indexOf["indexOf"]:::method
  end

  subgraph analyze_service["analyze-service Service"]
    CodeAnalyzer_analyze["analyze"]:::method
  end

  subgraph deduplicate_service["deduplicate-service Service"]
    CodeAnalyzer_deduplicate["deduplicate"]:::method
  end

  subgraph enhanceWithArchitecturalAnalysis_service["enhanceWithArchitecturalAnalysis-service Service"]
    CodeAnalyzer_enhanceWithArchitecturalAnalysis["enhanceWithArchitecturalAnalysis"]:::method
  end

  subgraph analyzeArchitecturalLayers_service["analyzeArchitecturalLayers-service Service"]
    CodeAnalyzer_analyzeArchitecturalLayers["analyzeArchitecturalLayers"]:::method
  end

  subgraph analyzeArchitecturalPatterns_service["analyzeArchitecturalPatterns-service Service"]
    CodeAnalyzer_analyzeArchitecturalPatterns["analyzeArchitecturalPatterns"]:::method
  end

  subgraph loadFileContents_service["loadFileContents-service Service"]
    CodeAnalyzer_loadFileContents["loadFileContents"]:::method
  end

  subgraph analyzeRelationships_service["analyzeRelationships-service Service"]
    CodeAnalyzer_analyzeRelationships["analyzeRelationships"]:::method
    ArchitecturalAnalyzer_analyzeRelationships["analyzeRelationships"]:::method
  end

  subgraph categorizeRelationships_service["categorizeRelationships-service Service"]
    CodeAnalyzer_categorizeRelationships["categorizeRelationships"]:::method
  end

  subgraph detectArchitecturalLayer_service["detectArchitecturalLayer-service Service"]
    CodeAnalyzer_detectArchitecturalLayer["detectArchitecturalLayer"]:::method
    ArchitecturalAnalyzer_detectArchitecturalLayer["detectArchitecturalLayer"]:::method
  end

  subgraph typescriptAnalyzer_service["typescriptAnalyzer-service Service"]
    CodeAnalyzer_typescriptAnalyzer["typescriptAnalyzer"]:::method
  end

  subgraph javascriptAnalyzer_service["javascriptAnalyzer-service Service"]
    CodeAnalyzer_javascriptAnalyzer["javascriptAnalyzer"]:::method
  end

  subgraph pythonAnalyzer_service["pythonAnalyzer-service Service"]
    CodeAnalyzer_pythonAnalyzer["pythonAnalyzer"]:::method
  end

  subgraph architecturalAnalyzer_service["architecturalAnalyzer-service Service"]
    CodeAnalyzer_architecturalAnalyzer["architecturalAnalyzer"]:::method
  end

  subgraph relationshipAnalyzer_service["relationshipAnalyzer-service Service"]
    CodeAnalyzer_relationshipAnalyzer["relationshipAnalyzer"]:::method
  end

  subgraph detectFrameworks_service["detectFrameworks-service Service"]
    ArchitecturalAnalyzer_detectFrameworks["detectFrameworks"]:::method
  end

  subgraph detectPatterns_service["detectPatterns-service Service"]
    ArchitecturalAnalyzer_detectPatterns["detectPatterns"]:::method
  end

  subgraph inferResponsibilities_service["inferResponsibilities-service Service"]
    ArchitecturalAnalyzer_inferResponsibilities["inferResponsibilities"]:::method
  end

  subgraph calculatePatternConfidence_service["calculatePatternConfidence-service Service"]
    ArchitecturalAnalyzer_calculatePatternConfidence["calculatePatternConfidence"]:::method
  end

  subgraph extractApiCalls_service["extractApiCalls-service Service"]
    ArchitecturalAnalyzer_extractApiCalls["extractApiCalls"]:::method
  end

  subgraph extractEvents_service["extractEvents-service Service"]
    ArchitecturalAnalyzer_extractEvents["extractEvents"]:::method
  end

  subgraph extractDatabaseOperations_service["extractDatabaseOperations-service Service"]
    ArchitecturalAnalyzer_extractDatabaseOperations["extractDatabaseOperations"]:::method
  end

  subgraph round_service["round-service Service"]
    ArchitecturalAnalyzer_round["round"]:::method
  end

  main -->|getInput| getInput_service
  main -->|split| split_service
  main -->|map| map_service
  main -->|trim| trim_service
  main -->|getOctokit| getOctokit_service
  main -->|warning| warning_service
  main -->|info| info_service
  main -->|cwd| cwd_service
  main -->|analyzeCodebase| analyzeCodebase_service
  main -->|keys| keys_service
  main -->|generateDiagrams| generateDiagrams_service
  main -->|ensureDir| ensureDir_service
  main -->|entries| entries_service
  main -->|join| join_service
  main -->|resolve| resolve_service
  main -->|writeFile| writeFile_service
  main -->|chmod| chmod_service
  main -->|push| push_service
  main -->|commitChanges| commitChanges_service
  main -->|setFailed| setFailed_service
  main -->|error| error_service
  main -->|pathExists| pathExists_service
  main -->|readFile| readFile_service
  main -->|parse| parse_service
  loadConfig -->|getInput| getInput_service
  loadConfig -->|split| split_service
  loadConfig -->|map| map_service
  loadConfig -->|trim| trim_service
  loadConfig -->|getOctokit| getOctokit_service
  loadConfig -->|warning| warning_service
  loadConfig -->|info| info_service
  loadConfig -->|cwd| cwd_service
  loadConfig -->|analyzeCodebase| analyzeCodebase_service
  loadConfig -->|keys| keys_service
  loadConfig -->|generateDiagrams| generateDiagrams_service
  loadConfig -->|ensureDir| ensureDir_service
  loadConfig -->|entries| entries_service
  loadConfig -->|join| join_service
  loadConfig -->|resolve| resolve_service
  loadConfig -->|writeFile| writeFile_service
  loadConfig -->|chmod| chmod_service
  loadConfig -->|push| push_service
  loadConfig -->|commitChanges| commitChanges_service
  loadConfig -->|setFailed| setFailed_service
  loadConfig -->|error| error_service
  loadConfig -->|pathExists| pathExists_service
  loadConfig -->|readFile| readFile_service
  loadConfig -->|parse| parse_service
  languages -->|getInput| getInput_service
  languages -->|split| split_service
  languages -->|map| map_service
  languages -->|trim| trim_service
  languages -->|getOctokit| getOctokit_service
  languages -->|warning| warning_service
  languages -->|info| info_service
  languages -->|cwd| cwd_service
  languages -->|analyzeCodebase| analyzeCodebase_service
  languages -->|keys| keys_service
  languages -->|generateDiagrams| generateDiagrams_service
  languages -->|ensureDir| ensureDir_service
  languages -->|entries| entries_service
  languages -->|join| join_service
  languages -->|resolve| resolve_service
  languages -->|writeFile| writeFile_service
  languages -->|chmod| chmod_service
  languages -->|push| push_service
  languages -->|commitChanges| commitChanges_service
  languages -->|setFailed| setFailed_service
  languages -->|error| error_service
  languages -->|pathExists| pathExists_service
  languages -->|readFile| readFile_service
  languages -->|parse| parse_service
  GitManager -->|log| log_service
  GitManager -->|isGitRepository| isGitRepository_service
  GitManager -->|cwd| cwd_service
  GitManager -->|trim| trim_service
  GitManager -->|chdir| chdir_service
  GitManager -->|hasChanges| hasChanges_service
  GitManager -->|configureGitUser| configureGitUser_service
  GitManager -->|error| error_service
  GitManager -->|existsSync| existsSync_service
  GitManager -->|readdirSync| readdirSync_service
  DiagramGenerator -->|generateArchitectureDiagram| generateArchitectureDiagram_service
  DiagramGenerator -->|generateDependencyDiagram| generateDependencyDiagram_service
  DiagramGenerator -->|generateModuleDiagram| generateModuleDiagram_service
  DiagramGenerator -->|keys| keys_service
  DiagramGenerator -->|generateLayeredArchitectureDiagram| generateLayeredArchitectureDiagram_service
  DiagramGenerator -->|generateMVCDiagram| generateMVCDiagram_service
  DiagramGenerator -->|generateMicroservicesDiagram| generateMicroservicesDiagram_service
  DiagramGenerator -->|generateApiFlowDiagram| generateApiFlowDiagram_service
  DiagramGenerator -->|generateDataFlowDiagram| generateDataFlowDiagram_service
  DiagramGenerator -->|generateEventFlowDiagram| generateEventFlowDiagram_service
  DiagramGenerator -->|generateServiceCommunicationDiagram| generateServiceCommunicationDiagram_service
  DiagramGenerator -->|uniqueByName| uniqueByName_service
  DiagramGenerator -->|filterComponentsForDiagram| filterComponentsForDiagram_service
  DiagramGenerator -->|filterDependenciesForDiagram| filterDependenciesForDiagram_service
  DiagramGenerator -->|groupComponentsByDirectory| groupComponentsByDirectory_service
  DiagramGenerator -->|entries| entries_service
  DiagramGenerator -->|sort| sort_service
  DiagramGenerator -->|slice| slice_service
  DiagramGenerator -->|forEach| forEach_service
  DiagramGenerator -->|sanitizeName| sanitizeName_service
  DiagramGenerator -->|getDisplayName| getDisplayName_service
  DiagramGenerator -->|getDisplayComponentName| getDisplayComponentName_service
  DiagramGenerator -->|getComponentMetrics| getComponentMetrics_service
  DiagramGenerator -->|enhanceComponentName| enhanceComponentName_service
  DiagramGenerator -->|generateComponentTooltip| generateComponentTooltip_service
  DiagramGenerator -->|map| map_service
  DiagramGenerator -->|getComponentClass| getComponentClass_service
  DiagramGenerator -->|addInternalRelationships| addInternalRelationships_service
  DiagramGenerator -->|addExternalDependencies| addExternalDependencies_service
  DiagramGenerator -->|wrapInMarkdown| wrapInMarkdown_service
  DiagramGenerator -->|filter| filter_service
  DiagramGenerator -->|isExternalDependency| isExternalDependency_service
  DiagramGenerator -->|has| has_service
  DiagramGenerator -->|add| add_service
  DiagramGenerator -->|dirname| dirname_service
  DiagramGenerator -->|push| push_service
  DiagramGenerator -->|replace| replace_service
  DiagramGenerator -->|some| some_service
  DiagramGenerator -->|startsWith| startsWith_service
  DiagramGenerator -->|generateDiagramMetadata| generateDiagramMetadata_service
  DiagramGenerator -->|generateLegend| generateLegend_service
  DiagramGenerator -->|calculateDiagramStats| calculateDiagramStats_service
  DiagramGenerator -->|generateArchitecturalInsights| generateArchitecturalInsights_service
  DiagramGenerator -->|join| join_service
  DiagramGenerator -->|toLocaleDateString| toLocaleDateString_service
  DiagramGenerator -->|analyzeComponentTypes| analyzeComponentTypes_service
  DiagramGenerator -->|analyzeDependencies| analyzeDependencies_service
  DiagramGenerator -->|analyzeComplexity| analyzeComplexity_service
  DiagramGenerator -->|toLowerCase| toLowerCase_service
  DiagramGenerator -->|includes| includes_service
  DiagramGenerator -->|detectCircularDependencies| detectCircularDependencies_service
  DiagramGenerator -->|set| set_service
  DiagramGenerator -->|get| get_service
  DiagramGenerator -->|calculateComplexity| calculateComplexity_service
  DiagramGenerator -->|from| from_service
  DiagramGenerator -->|toUpperCase| toUpperCase_service
  DiagramGenerator -->|groupRelationshipsBySource| groupRelationshipsBySource_service
  DiagramGenerator -->|groupRelationshipsByType| groupRelationshipsByType_service
  DiagramGenerator -->|getDataFlowClass| getDataFlowClass_service
  DiagramGenerator -->|groupRelationshipsByEvent| groupRelationshipsByEvent_service
  DiagramGenerator -->|groupRelationshipsByService| groupRelationshipsByService_service
  DiagramGenerator -->|isTestFile| isTestFile_service
  DiagramGenerator -->|isDependencyLayer| isDependencyLayer_service
  DiagramGenerator -->|isInternalImplementation| isInternalImplementation_service
  DiagramGenerator -->|isUtilityFile| isUtilityFile_service
  DiagramGenerator -->|getComponentImportance| getComponentImportance_service
  DiagramGenerator -->|split| split_service
  DiagramGenerator -->|test| test_service
  DiagramGenerator -->|substring| substring_service
  DiagramGenerator -->|find| find_service
  DiagramGenerator -->|getRelationshipLabel| getRelationshipLabel_service
  DiagramGenerator -->|getRelationshipStyle| getRelationshipStyle_service
  DiagramGenerator -->|addArchitecturalRelationships| addArchitecturalRelationships_service
  DiagramGenerator -->|groupDependenciesByType| groupDependenciesByType_service
  DiagramGenerator -->|getDependencyClass| getDependencyClass_service
  DiagramGenerator -->|getDependencyTypeLabel| getDependencyTypeLabel_service
  DiagramGenerator -->|isFrameworkDependency| isFrameworkDependency_service
  DiagramGenerator -->|calculateComponentSize| calculateComponentSize_service
  DiagramGenerator -->|countDependencies| countDependencies_service
  DiagramGenerator -->|min| min_service
  based -->|generateArchitectureDiagram| generateArchitectureDiagram_service
  based -->|generateDependencyDiagram| generateDependencyDiagram_service
  based -->|generateModuleDiagram| generateModuleDiagram_service
  based -->|keys| keys_service
  based -->|generateLayeredArchitectureDiagram| generateLayeredArchitectureDiagram_service
  based -->|generateMVCDiagram| generateMVCDiagram_service
  based -->|generateMicroservicesDiagram| generateMicroservicesDiagram_service
  based -->|generateApiFlowDiagram| generateApiFlowDiagram_service
  based -->|generateDataFlowDiagram| generateDataFlowDiagram_service
  based -->|generateEventFlowDiagram| generateEventFlowDiagram_service
  based -->|generateServiceCommunicationDiagram| generateServiceCommunicationDiagram_service
  based -->|uniqueByName| uniqueByName_service
  based -->|filterComponentsForDiagram| filterComponentsForDiagram_service
  based -->|filterDependenciesForDiagram| filterDependenciesForDiagram_service
  based -->|groupComponentsByDirectory| groupComponentsByDirectory_service
  based -->|entries| entries_service
  based -->|sort| sort_service
  based -->|slice| slice_service
  based -->|forEach| forEach_service
  based -->|sanitizeName| sanitizeName_service
  based -->|getDisplayName| getDisplayName_service
  based -->|getDisplayComponentName| getDisplayComponentName_service
  based -->|getComponentMetrics| getComponentMetrics_service
  based -->|enhanceComponentName| enhanceComponentName_service
  based -->|generateComponentTooltip| generateComponentTooltip_service
  based -->|map| map_service
  based -->|getComponentClass| getComponentClass_service
  based -->|addInternalRelationships| addInternalRelationships_service
  based -->|addExternalDependencies| addExternalDependencies_service
  based -->|wrapInMarkdown| wrapInMarkdown_service
  based -->|filter| filter_service
  based -->|isExternalDependency| isExternalDependency_service
  based -->|has| has_service
  based -->|add| add_service
  based -->|dirname| dirname_service
  based -->|push| push_service
  based -->|replace| replace_service
  based -->|some| some_service
  based -->|startsWith| startsWith_service
  based -->|generateDiagramMetadata| generateDiagramMetadata_service
  based -->|generateLegend| generateLegend_service
  based -->|calculateDiagramStats| calculateDiagramStats_service
  based -->|generateArchitecturalInsights| generateArchitecturalInsights_service
  based -->|join| join_service
  based -->|toLocaleDateString| toLocaleDateString_service
  based -->|analyzeComponentTypes| analyzeComponentTypes_service
  based -->|analyzeDependencies| analyzeDependencies_service
  based -->|analyzeComplexity| analyzeComplexity_service
  based -->|toLowerCase| toLowerCase_service
  based -->|includes| includes_service
  based -->|detectCircularDependencies| detectCircularDependencies_service
  based -->|set| set_service
  based -->|get| get_service
  based -->|calculateComplexity| calculateComplexity_service
  based -->|from| from_service
  based -->|toUpperCase| toUpperCase_service
  based -->|groupRelationshipsBySource| groupRelationshipsBySource_service
  based -->|groupRelationshipsByType| groupRelationshipsByType_service
  based -->|getDataFlowClass| getDataFlowClass_service
  based -->|groupRelationshipsByEvent| groupRelationshipsByEvent_service
  based -->|groupRelationshipsByService| groupRelationshipsByService_service
  based -->|isTestFile| isTestFile_service
  based -->|isDependencyLayer| isDependencyLayer_service
  based -->|isInternalImplementation| isInternalImplementation_service
  based -->|isUtilityFile| isUtilityFile_service
  based -->|getComponentImportance| getComponentImportance_service
  based -->|split| split_service
  based -->|test| test_service
  based -->|substring| substring_service
  based -->|find| find_service
  based -->|getRelationshipLabel| getRelationshipLabel_service
  based -->|getRelationshipStyle| getRelationshipStyle_service
  based -->|addArchitecturalRelationships| addArchitecturalRelationships_service
  based -->|groupDependenciesByType| groupDependenciesByType_service
  based -->|getDependencyClass| getDependencyClass_service
  based -->|getDependencyTypeLabel| getDependencyTypeLabel_service
  based -->|isFrameworkDependency| isFrameworkDependency_service
  based -->|calculateComponentSize| calculateComponentSize_service
  based -->|countDependencies| countDependencies_service
  based -->|min| min_service
  const -->|generateArchitectureDiagram| generateArchitectureDiagram_service
  const -->|generateDependencyDiagram| generateDependencyDiagram_service
  const -->|generateModuleDiagram| generateModuleDiagram_service
  const -->|keys| keys_service
  const -->|generateLayeredArchitectureDiagram| generateLayeredArchitectureDiagram_service
  const -->|generateMVCDiagram| generateMVCDiagram_service
  const -->|generateMicroservicesDiagram| generateMicroservicesDiagram_service
  const -->|generateApiFlowDiagram| generateApiFlowDiagram_service
  const -->|generateDataFlowDiagram| generateDataFlowDiagram_service
  const -->|generateEventFlowDiagram| generateEventFlowDiagram_service
  const -->|generateServiceCommunicationDiagram| generateServiceCommunicationDiagram_service
  const -->|uniqueByName| uniqueByName_service
  const -->|filterComponentsForDiagram| filterComponentsForDiagram_service
  const -->|filterDependenciesForDiagram| filterDependenciesForDiagram_service
  const -->|groupComponentsByDirectory| groupComponentsByDirectory_service
  const -->|entries| entries_service
  const -->|sort| sort_service
  const -->|slice| slice_service
  const -->|forEach| forEach_service
  const -->|sanitizeName| sanitizeName_service
  const -->|getDisplayName| getDisplayName_service
  const -->|getDisplayComponentName| getDisplayComponentName_service
  const -->|getComponentMetrics| getComponentMetrics_service
  const -->|enhanceComponentName| enhanceComponentName_service
  const -->|generateComponentTooltip| generateComponentTooltip_service
  const -->|map| map_service
  const -->|getComponentClass| getComponentClass_service
  const -->|addInternalRelationships| addInternalRelationships_service
  const -->|addExternalDependencies| addExternalDependencies_service
  const -->|wrapInMarkdown| wrapInMarkdown_service
  const -->|filter| filter_service
  const -->|isExternalDependency| isExternalDependency_service
  const -->|has| has_service
  const -->|add| add_service
  const -->|dirname| dirname_service
  const -->|push| push_service
  const -->|replace| replace_service
  const -->|some| some_service
  const -->|startsWith| startsWith_service
  const -->|generateDiagramMetadata| generateDiagramMetadata_service
  const -->|generateLegend| generateLegend_service
  const -->|calculateDiagramStats| calculateDiagramStats_service
  const -->|generateArchitecturalInsights| generateArchitecturalInsights_service
  const -->|join| join_service
  const -->|toLocaleDateString| toLocaleDateString_service
  const -->|analyzeComponentTypes| analyzeComponentTypes_service
  const -->|analyzeDependencies| analyzeDependencies_service
  const -->|analyzeComplexity| analyzeComplexity_service
  const -->|toLowerCase| toLowerCase_service
  const -->|includes| includes_service
  const -->|detectCircularDependencies| detectCircularDependencies_service
  const -->|set| set_service
  const -->|get| get_service
  const -->|calculateComplexity| calculateComplexity_service
  const -->|from| from_service
  const -->|toUpperCase| toUpperCase_service
  const -->|groupRelationshipsBySource| groupRelationshipsBySource_service
  const -->|groupRelationshipsByType| groupRelationshipsByType_service
  const -->|getDataFlowClass| getDataFlowClass_service
  const -->|groupRelationshipsByEvent| groupRelationshipsByEvent_service
  const -->|groupRelationshipsByService| groupRelationshipsByService_service
  const -->|isTestFile| isTestFile_service
  const -->|isDependencyLayer| isDependencyLayer_service
  const -->|isInternalImplementation| isInternalImplementation_service
  const -->|isUtilityFile| isUtilityFile_service
  const -->|getComponentImportance| getComponentImportance_service
  const -->|split| split_service
  const -->|test| test_service
  const -->|substring| substring_service
  const -->|find| find_service
  const -->|getRelationshipLabel| getRelationshipLabel_service
  const -->|getRelationshipStyle| getRelationshipStyle_service
  const -->|addArchitecturalRelationships| addArchitecturalRelationships_service
  const -->|groupDependenciesByType| groupDependenciesByType_service
  const -->|getDependencyClass| getDependencyClass_service
  const -->|getDependencyTypeLabel| getDependencyTypeLabel_service
  const -->|isFrameworkDependency| isFrameworkDependency_service
  const -->|calculateComponentSize| calculateComponentSize_service
  const -->|countDependencies| countDependencies_service
  const -->|min| min_service
  let -->|generateArchitectureDiagram| generateArchitectureDiagram_service
  let -->|generateDependencyDiagram| generateDependencyDiagram_service
  let -->|generateModuleDiagram| generateModuleDiagram_service
  let -->|keys| keys_service
  let -->|generateLayeredArchitectureDiagram| generateLayeredArchitectureDiagram_service
  let -->|generateMVCDiagram| generateMVCDiagram_service
  let -->|generateMicroservicesDiagram| generateMicroservicesDiagram_service
  let -->|generateApiFlowDiagram| generateApiFlowDiagram_service
  let -->|generateDataFlowDiagram| generateDataFlowDiagram_service
  let -->|generateEventFlowDiagram| generateEventFlowDiagram_service
  let -->|generateServiceCommunicationDiagram| generateServiceCommunicationDiagram_service
  let -->|uniqueByName| uniqueByName_service
  let -->|filterComponentsForDiagram| filterComponentsForDiagram_service
  let -->|filterDependenciesForDiagram| filterDependenciesForDiagram_service
  let -->|groupComponentsByDirectory| groupComponentsByDirectory_service
  let -->|entries| entries_service
  let -->|sort| sort_service
  let -->|slice| slice_service
  let -->|forEach| forEach_service
  let -->|sanitizeName| sanitizeName_service
  let -->|getDisplayName| getDisplayName_service
  let -->|getDisplayComponentName| getDisplayComponentName_service
  let -->|getComponentMetrics| getComponentMetrics_service
  let -->|enhanceComponentName| enhanceComponentName_service
  let -->|generateComponentTooltip| generateComponentTooltip_service
  let -->|map| map_service
  let -->|getComponentClass| getComponentClass_service
  let -->|addInternalRelationships| addInternalRelationships_service
  let -->|addExternalDependencies| addExternalDependencies_service
  let -->|wrapInMarkdown| wrapInMarkdown_service
  let -->|filter| filter_service
  let -->|isExternalDependency| isExternalDependency_service
  let -->|has| has_service
  let -->|add| add_service
  let -->|dirname| dirname_service
  let -->|push| push_service
  let -->|replace| replace_service
  let -->|some| some_service
  let -->|startsWith| startsWith_service
  let -->|generateDiagramMetadata| generateDiagramMetadata_service
  let -->|generateLegend| generateLegend_service
  let -->|calculateDiagramStats| calculateDiagramStats_service
  let -->|generateArchitecturalInsights| generateArchitecturalInsights_service
  let -->|join| join_service
  let -->|toLocaleDateString| toLocaleDateString_service
  let -->|analyzeComponentTypes| analyzeComponentTypes_service
  let -->|analyzeDependencies| analyzeDependencies_service
  let -->|analyzeComplexity| analyzeComplexity_service
  let -->|toLowerCase| toLowerCase_service
  let -->|includes| includes_service
  let -->|detectCircularDependencies| detectCircularDependencies_service
  let -->|set| set_service
  let -->|get| get_service
  let -->|calculateComplexity| calculateComplexity_service
  let -->|from| from_service
  let -->|toUpperCase| toUpperCase_service
  let -->|groupRelationshipsBySource| groupRelationshipsBySource_service
  let -->|groupRelationshipsByType| groupRelationshipsByType_service
  let -->|getDataFlowClass| getDataFlowClass_service
  let -->|groupRelationshipsByEvent| groupRelationshipsByEvent_service
  let -->|groupRelationshipsByService| groupRelationshipsByService_service
  let -->|isTestFile| isTestFile_service
  let -->|isDependencyLayer| isDependencyLayer_service
  let -->|isInternalImplementation| isInternalImplementation_service
  let -->|isUtilityFile| isUtilityFile_service
  let -->|getComponentImportance| getComponentImportance_service
  let -->|split| split_service
  let -->|test| test_service
  let -->|substring| substring_service
  let -->|find| find_service
  let -->|getRelationshipLabel| getRelationshipLabel_service
  let -->|getRelationshipStyle| getRelationshipStyle_service
  let -->|addArchitecturalRelationships| addArchitecturalRelationships_service
  let -->|groupDependenciesByType| groupDependenciesByType_service
  let -->|getDependencyClass| getDependencyClass_service
  let -->|getDependencyTypeLabel| getDependencyTypeLabel_service
  let -->|isFrameworkDependency| isFrameworkDependency_service
  let -->|calculateComponentSize| calculateComponentSize_service
  let -->|countDependencies| countDependencies_service
  let -->|min| min_service
  for -->|generateArchitectureDiagram| generateArchitectureDiagram_service
  for -->|generateDependencyDiagram| generateDependencyDiagram_service
  for -->|generateModuleDiagram| generateModuleDiagram_service
  for -->|keys| keys_service
  for -->|generateLayeredArchitectureDiagram| generateLayeredArchitectureDiagram_service
  for -->|generateMVCDiagram| generateMVCDiagram_service
  for -->|generateMicroservicesDiagram| generateMicroservicesDiagram_service
  for -->|generateApiFlowDiagram| generateApiFlowDiagram_service
  for -->|generateDataFlowDiagram| generateDataFlowDiagram_service
  for -->|generateEventFlowDiagram| generateEventFlowDiagram_service
  for -->|generateServiceCommunicationDiagram| generateServiceCommunicationDiagram_service
  for -->|uniqueByName| uniqueByName_service
  for -->|filterComponentsForDiagram| filterComponentsForDiagram_service
  for -->|filterDependenciesForDiagram| filterDependenciesForDiagram_service
  for -->|groupComponentsByDirectory| groupComponentsByDirectory_service
  for -->|entries| entries_service
  for -->|sort| sort_service
  for -->|slice| slice_service
  for -->|forEach| forEach_service
  for -->|sanitizeName| sanitizeName_service
  for -->|getDisplayName| getDisplayName_service
  for -->|getDisplayComponentName| getDisplayComponentName_service
  for -->|getComponentMetrics| getComponentMetrics_service
  for -->|enhanceComponentName| enhanceComponentName_service
  for -->|generateComponentTooltip| generateComponentTooltip_service
  for -->|map| map_service
  for -->|getComponentClass| getComponentClass_service
  for -->|addInternalRelationships| addInternalRelationships_service
  for -->|addExternalDependencies| addExternalDependencies_service
  for -->|wrapInMarkdown| wrapInMarkdown_service
  for -->|filter| filter_service
  for -->|isExternalDependency| isExternalDependency_service
  for -->|has| has_service
  for -->|add| add_service
  for -->|dirname| dirname_service
  for -->|push| push_service
  for -->|replace| replace_service
  for -->|some| some_service
  for -->|startsWith| startsWith_service
  for -->|generateDiagramMetadata| generateDiagramMetadata_service
  for -->|generateLegend| generateLegend_service
  for -->|calculateDiagramStats| calculateDiagramStats_service
  for -->|generateArchitecturalInsights| generateArchitecturalInsights_service
  for -->|join| join_service
  for -->|toLocaleDateString| toLocaleDateString_service
  for -->|analyzeComponentTypes| analyzeComponentTypes_service
  for -->|analyzeDependencies| analyzeDependencies_service
  for -->|analyzeComplexity| analyzeComplexity_service
  for -->|toLowerCase| toLowerCase_service
  for -->|includes| includes_service
  for -->|detectCircularDependencies| detectCircularDependencies_service
  for -->|set| set_service
  for -->|get| get_service
  for -->|calculateComplexity| calculateComplexity_service
  for -->|from| from_service
  for -->|toUpperCase| toUpperCase_service
  for -->|groupRelationshipsBySource| groupRelationshipsBySource_service
  for -->|groupRelationshipsByType| groupRelationshipsByType_service
  for -->|getDataFlowClass| getDataFlowClass_service
  for -->|groupRelationshipsByEvent| groupRelationshipsByEvent_service
  for -->|groupRelationshipsByService| groupRelationshipsByService_service
  for -->|isTestFile| isTestFile_service
  for -->|isDependencyLayer| isDependencyLayer_service
  for -->|isInternalImplementation| isInternalImplementation_service
  for -->|isUtilityFile| isUtilityFile_service
  for -->|getComponentImportance| getComponentImportance_service
  for -->|split| split_service
  for -->|test| test_service
  for -->|substring| substring_service
  for -->|find| find_service
  for -->|getRelationshipLabel| getRelationshipLabel_service
  for -->|getRelationshipStyle| getRelationshipStyle_service
  for -->|addArchitecturalRelationships| addArchitecturalRelationships_service
  for -->|groupDependenciesByType| groupDependenciesByType_service
  for -->|getDependencyClass| getDependencyClass_service
  for -->|getDependencyTypeLabel| getDependencyTypeLabel_service
  for -->|isFrameworkDependency| isFrameworkDependency_service
  for -->|calculateComponentSize| calculateComponentSize_service
  for -->|countDependencies| countDependencies_service
  for -->|min| min_service
  calls -->|generateArchitectureDiagram| generateArchitectureDiagram_service
  calls -->|generateDependencyDiagram| generateDependencyDiagram_service
  calls -->|generateModuleDiagram| generateModuleDiagram_service
  calls -->|keys| keys_service
  calls -->|generateLayeredArchitectureDiagram| generateLayeredArchitectureDiagram_service
  calls -->|generateMVCDiagram| generateMVCDiagram_service
  calls -->|generateMicroservicesDiagram| generateMicroservicesDiagram_service
  calls -->|generateApiFlowDiagram| generateApiFlowDiagram_service
  calls -->|generateDataFlowDiagram| generateDataFlowDiagram_service
  calls -->|generateEventFlowDiagram| generateEventFlowDiagram_service
  calls -->|generateServiceCommunicationDiagram| generateServiceCommunicationDiagram_service
  calls -->|uniqueByName| uniqueByName_service
  calls -->|filterComponentsForDiagram| filterComponentsForDiagram_service
  calls -->|filterDependenciesForDiagram| filterDependenciesForDiagram_service
  calls -->|groupComponentsByDirectory| groupComponentsByDirectory_service
  calls -->|entries| entries_service
  calls -->|sort| sort_service
  calls -->|slice| slice_service
  calls -->|forEach| forEach_service
  calls -->|sanitizeName| sanitizeName_service
  calls -->|getDisplayName| getDisplayName_service
  calls -->|getDisplayComponentName| getDisplayComponentName_service
  calls -->|getComponentMetrics| getComponentMetrics_service
  calls -->|enhanceComponentName| enhanceComponentName_service
  calls -->|generateComponentTooltip| generateComponentTooltip_service
  calls -->|map| map_service
  calls -->|getComponentClass| getComponentClass_service
  calls -->|addInternalRelationships| addInternalRelationships_service
  calls -->|addExternalDependencies| addExternalDependencies_service
  calls -->|wrapInMarkdown| wrapInMarkdown_service
  calls -->|filter| filter_service
  calls -->|isExternalDependency| isExternalDependency_service
  calls -->|has| has_service
  calls -->|add| add_service
  calls -->|dirname| dirname_service
  calls -->|push| push_service
  calls -->|replace| replace_service
  calls -->|some| some_service
  calls -->|startsWith| startsWith_service
  calls -->|generateDiagramMetadata| generateDiagramMetadata_service
  calls -->|generateLegend| generateLegend_service
  calls -->|calculateDiagramStats| calculateDiagramStats_service
  calls -->|generateArchitecturalInsights| generateArchitecturalInsights_service
  calls -->|join| join_service
  calls -->|toLocaleDateString| toLocaleDateString_service
  calls -->|analyzeComponentTypes| analyzeComponentTypes_service
  calls -->|analyzeDependencies| analyzeDependencies_service
  calls -->|analyzeComplexity| analyzeComplexity_service
  calls -->|toLowerCase| toLowerCase_service
  calls -->|includes| includes_service
  calls -->|detectCircularDependencies| detectCircularDependencies_service
  calls -->|set| set_service
  calls -->|get| get_service
  calls -->|calculateComplexity| calculateComplexity_service
  calls -->|from| from_service
  calls -->|toUpperCase| toUpperCase_service
  calls -->|groupRelationshipsBySource| groupRelationshipsBySource_service
  calls -->|groupRelationshipsByType| groupRelationshipsByType_service
  calls -->|getDataFlowClass| getDataFlowClass_service
  calls -->|groupRelationshipsByEvent| groupRelationshipsByEvent_service
  calls -->|groupRelationshipsByService| groupRelationshipsByService_service
  calls -->|isTestFile| isTestFile_service
  calls -->|isDependencyLayer| isDependencyLayer_service
  calls -->|isInternalImplementation| isInternalImplementation_service
  calls -->|isUtilityFile| isUtilityFile_service
  calls -->|getComponentImportance| getComponentImportance_service
  calls -->|split| split_service
  calls -->|test| test_service
  calls -->|substring| substring_service
  calls -->|find| find_service
  calls -->|getRelationshipLabel| getRelationshipLabel_service
  calls -->|getRelationshipStyle| getRelationshipStyle_service
  calls -->|addArchitecturalRelationships| addArchitecturalRelationships_service
  calls -->|groupDependenciesByType| groupDependenciesByType_service
  calls -->|getDependencyClass| getDependencyClass_service
  calls -->|getDependencyTypeLabel| getDependencyTypeLabel_service
  calls -->|isFrameworkDependency| isFrameworkDependency_service
  calls -->|calculateComponentSize| calculateComponentSize_service
  calls -->|countDependencies| countDependencies_service
  calls -->|min| min_service
  TypeScriptAnalyzer -->|findTypeScriptFiles| findTypeScriptFiles_service
  TypeScriptAnalyzer -->|readFile| readFile_service
  TypeScriptAnalyzer -->|analyzeFile| analyzeFile_service
  TypeScriptAnalyzer -->|push| push_service
  TypeScriptAnalyzer -->|warn| warn_service
  TypeScriptAnalyzer -->|createSourceFile| createSourceFile_service
  TypeScriptAnalyzer -->|extractImports| extractImports_service
  TypeScriptAnalyzer -->|extractExports| extractExports_service
  TypeScriptAnalyzer -->|extractComponents| extractComponents_service
  TypeScriptAnalyzer -->|isImportDeclaration| isImportDeclaration_service
  TypeScriptAnalyzer -->|getText| getText_service
  TypeScriptAnalyzer -->|slice| slice_service
  TypeScriptAnalyzer -->|isNamedImports| isNamedImports_service
  TypeScriptAnalyzer -->|forEach| forEach_service
  TypeScriptAnalyzer -->|forEachChild| forEachChild_service
  TypeScriptAnalyzer -->|isExportDeclaration| isExportDeclaration_service
  TypeScriptAnalyzer -->|isNamedExports| isNamedExports_service
  TypeScriptAnalyzer -->|isExportAssignment| isExportAssignment_service
  TypeScriptAnalyzer -->|some| some_service
  TypeScriptAnalyzer -->|isFunctionDeclaration| isFunctionDeclaration_service
  TypeScriptAnalyzer -->|isClassDeclaration| isClassDeclaration_service
  TypeScriptAnalyzer -->|isInterfaceDeclaration| isInterfaceDeclaration_service
  TypeScriptAnalyzer -->|isVariableDeclaration| isVariableDeclaration_service
  visit -->|findTypeScriptFiles| findTypeScriptFiles_service
  visit -->|readFile| readFile_service
  visit -->|analyzeFile| analyzeFile_service
  visit -->|push| push_service
  visit -->|warn| warn_service
  visit -->|createSourceFile| createSourceFile_service
  visit -->|extractImports| extractImports_service
  visit -->|extractExports| extractExports_service
  visit -->|extractComponents| extractComponents_service
  visit -->|isImportDeclaration| isImportDeclaration_service
  visit -->|getText| getText_service
  visit -->|slice| slice_service
  visit -->|isNamedImports| isNamedImports_service
  visit -->|forEach| forEach_service
  visit -->|forEachChild| forEachChild_service
  visit -->|isExportDeclaration| isExportDeclaration_service
  visit -->|isNamedExports| isNamedExports_service
  visit -->|isExportAssignment| isExportAssignment_service
  visit -->|some| some_service
  visit -->|isFunctionDeclaration| isFunctionDeclaration_service
  visit -->|isClassDeclaration| isClassDeclaration_service
  visit -->|isInterfaceDeclaration| isInterfaceDeclaration_service
  visit -->|isVariableDeclaration| isVariableDeclaration_service
  RelationshipAnalyzer -->|undefined| service
  RelationshipAnalyzer -->|entries| entries_service
  RelationshipAnalyzer -->|detectRelationshipsOfType| detectRelationshipsOfType_service
  RelationshipAnalyzer -->|push| push_service
  RelationshipAnalyzer -->|deduplicateRelationships| deduplicateRelationships_service
  RelationshipAnalyzer -->|forEach| forEach_service
  RelationshipAnalyzer -->|exec| exec_service
  RelationshipAnalyzer -->|createRelationship| createRelationship_service
  RelationshipAnalyzer -->|calculateConfidence| calculateConfidence_service
  RelationshipAnalyzer -->|extractApiTarget| extractApiTarget_service
  RelationshipAnalyzer -->|extractHttpMethod| extractHttpMethod_service
  RelationshipAnalyzer -->|extractDataTarget| extractDataTarget_service
  RelationshipAnalyzer -->|extractDataType| extractDataType_service
  RelationshipAnalyzer -->|extractDataDescription| extractDataDescription_service
  RelationshipAnalyzer -->|extractServiceTarget| extractServiceTarget_service
  RelationshipAnalyzer -->|extractDatabaseTarget| extractDatabaseTarget_service
  RelationshipAnalyzer -->|extractDatabaseOperation| extractDatabaseOperation_service
  RelationshipAnalyzer -->|split| split_service
  RelationshipAnalyzer -->|match| match_service
  RelationshipAnalyzer -->|toUpperCase| toUpperCase_service
  RelationshipAnalyzer -->|includes| includes_service
  RelationshipAnalyzer -->|toLowerCase| toLowerCase_service
  RelationshipAnalyzer -->|min| min_service
  RelationshipAnalyzer -->|filter| filter_service
  RelationshipAnalyzer -->|has| has_service
  RelationshipAnalyzer -->|add| add_service
  RelationshipAnalyzer -->|readFile| readFile_service
  RelationshipAnalyzer -->|warn| warn_service
  PythonAnalyzer -->|findFiles| findFiles_service
  PythonAnalyzer -->|readFile| readFile_service
  PythonAnalyzer -->|analyzeFile| analyzeFile_service
  PythonAnalyzer -->|push| push_service
  PythonAnalyzer -->|warn| warn_service
  PythonAnalyzer -->|relative| relative_service
  PythonAnalyzer -->|cwd| cwd_service
  PythonAnalyzer -->|basename| basename_service
  PythonAnalyzer -->|extractImports| extractImports_service
  PythonAnalyzer -->|forEach| forEach_service
  PythonAnalyzer -->|extractClasses| extractClasses_service
  PythonAnalyzer -->|extractFunctions| extractFunctions_service
  PythonAnalyzer -->|split| split_service
  PythonAnalyzer -->|trim| trim_service
  PythonAnalyzer -->|match| match_service
  PythonAnalyzer -->|isLocalImport| isLocalImport_service
  PythonAnalyzer -->|map| map_service
  PythonAnalyzer -->|exec| exec_service
  PythonAnalyzer -->|startsWith| startsWith_service
  PythonAnalyzer -->|includes| includes_service
  PythonAnalyzer -->|isKnownExternalModule| isKnownExternalModule_service
  JavaScriptAnalyzer -->|findJavaScriptFiles| findJavaScriptFiles_service
  JavaScriptAnalyzer -->|readFile| readFile_service
  JavaScriptAnalyzer -->|analyzeFile| analyzeFile_service
  JavaScriptAnalyzer -->|push| push_service
  JavaScriptAnalyzer -->|warn| warn_service
  JavaScriptAnalyzer -->|extractImports| extractImports_service
  JavaScriptAnalyzer -->|extractExports| extractExports_service
  JavaScriptAnalyzer -->|extractComponents| extractComponents_service
  JavaScriptAnalyzer -->|forEach| forEach_service
  JavaScriptAnalyzer -->|exec| exec_service
  JavaScriptAnalyzer -->|split| split_service
  JavaScriptAnalyzer -->|map| map_service
  JavaScriptAnalyzer -->|trim| trim_service
  JavaScriptAnalyzer -->|includes| includes_service
  JavaScriptAnalyzer -->|indexOf| indexOf_service
  JavaScriptAnalyzer -->|substring| substring_service
  declarations -->|findJavaScriptFiles| findJavaScriptFiles_service
  declarations -->|readFile| readFile_service
  declarations -->|analyzeFile| analyzeFile_service
  declarations -->|push| push_service
  declarations -->|warn| warn_service
  declarations -->|extractImports| extractImports_service
  declarations -->|extractExports| extractExports_service
  declarations -->|extractComponents| extractComponents_service
  declarations -->|forEach| forEach_service
  declarations -->|exec| exec_service
  declarations -->|split| split_service
  declarations -->|map| map_service
  declarations -->|trim| trim_service
  declarations -->|includes| includes_service
  declarations -->|indexOf| indexOf_service
  declarations -->|substring| substring_service
  CodeAnalyzer -->|analyze| analyze_service
  CodeAnalyzer -->|push| push_service
  CodeAnalyzer -->|deduplicate| deduplicate_service
  CodeAnalyzer -->|enhanceWithArchitecturalAnalysis| enhanceWithArchitecturalAnalysis_service
  CodeAnalyzer -->|analyzeArchitecturalLayers| analyzeArchitecturalLayers_service
  CodeAnalyzer -->|analyzeArchitecturalPatterns| analyzeArchitecturalPatterns_service
  CodeAnalyzer -->|map| map_service
  CodeAnalyzer -->|loadFileContents| loadFileContents_service
  CodeAnalyzer -->|analyzeRelationships| analyzeRelationships_service
  CodeAnalyzer -->|categorizeRelationships| categorizeRelationships_service
  CodeAnalyzer -->|filter| filter_service
  CodeAnalyzer -->|has| has_service
  CodeAnalyzer -->|add| add_service
  CodeAnalyzer -->|detectArchitecturalLayer| detectArchitecturalLayer_service
  CodeAnalyzer -->|forEach| forEach_service
  CodeAnalyzer -->|includes| includes_service
  CodeAnalyzer -->|typescriptAnalyzer| typescriptAnalyzer_service
  CodeAnalyzer -->|javascriptAnalyzer| javascriptAnalyzer_service
  CodeAnalyzer -->|pythonAnalyzer| pythonAnalyzer_service
  CodeAnalyzer -->|architecturalAnalyzer| architecturalAnalyzer_service
  CodeAnalyzer -->|relationshipAnalyzer| relationshipAnalyzer_service
  ArchitecturalAnalyzer -->|undefined| service
  ArchitecturalAnalyzer -->|detectFrameworks| detectFrameworks_service
  ArchitecturalAnalyzer -->|detectArchitecturalLayer| detectArchitecturalLayer_service
  ArchitecturalAnalyzer -->|detectPatterns| detectPatterns_service
  ArchitecturalAnalyzer -->|inferResponsibilities| inferResponsibilities_service
  ArchitecturalAnalyzer -->|analyzeRelationships| analyzeRelationships_service
  ArchitecturalAnalyzer -->|entries| entries_service
  ArchitecturalAnalyzer -->|some| some_service
  ArchitecturalAnalyzer -->|test| test_service
  ArchitecturalAnalyzer -->|toLowerCase| toLowerCase_service
  ArchitecturalAnalyzer -->|includes| includes_service
  ArchitecturalAnalyzer -->|push| push_service
  ArchitecturalAnalyzer -->|calculateConfidence| calculateConfidence_service
  ArchitecturalAnalyzer -->|split| split_service
  ArchitecturalAnalyzer -->|calculatePatternConfidence| calculatePatternConfidence_service
  ArchitecturalAnalyzer -->|extractApiCalls| extractApiCalls_service
  ArchitecturalAnalyzer -->|extractEvents| extractEvents_service
  ArchitecturalAnalyzer -->|extractDatabaseOperations| extractDatabaseOperations_service
  ArchitecturalAnalyzer -->|forEach| forEach_service
  ArchitecturalAnalyzer -->|exec| exec_service
  ArchitecturalAnalyzer -->|replace| replace_service
  ArchitecturalAnalyzer -->|round| round_service

```

## 🎨 Legend

| Component Type | Color | Description |
|---|---|---|
| 🔍 **Analyzer** | Green | Code analysis components |
| 🎨 **Generator** | Orange | Diagram generation components |
| ⚙️ **Manager** | Purple | Resource management components |
| 🔧 **Service** | Teal | Business logic and services |
| 📦 **NPM** | Blue | Node.js packages |
| 🏗️ **Framework** | Light Green | Framework dependencies |
| 🌐 **External** | Red | External libraries |

## 📊 Visual Indicators

| Symbol | Meaning | Description |
|---|---|---|
| 📦 | Large Component | Component with >100 lines of code |
| 📄 | Medium Component | Component with 50-100 lines of code |
| 📝 | Small Component | Component with <50 lines of code |
| ⚡ | High Complexity | Complex component (complexity ≥4) |
| 🔥 | Medium Complexity | Moderate complexity (complexity ≥3) |
| 🔗 | High Dependencies | Component with >5 dependencies |

## 🔗 Relationship Types

- **imports**: Module imports and dependencies
- **calls**: Method/function calls
- **generates**: Component generates output
- **uses**: Component utilizes another component
- **API**: API calls and communication
- **data**: Data flow between components


---
*Generated by [Diagrammer GitHub Action](https://github.com/samjhill/diagrammer)*
